const User = require('../models/User');
const Post = require('../models/Post');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
require('dotenv').config();

const pubsub = new PubSub();

const resolvers = {
    User: {
      events: async (parent) => {
          return Event.find({ creator: parent.id });
      }
    },
    Event: {
        creator: async (parent) => {
            return User.findById(parent.creator);
        },
    },
    Query: {
        me: async (_, __, context) => {
            const userId = context.userId;
            if (!userId) throw new Error('Unauthorized');
            const user = await User.findById(userId);
            if (!user) throw new Error('User not found');
            return { id: user.id, username: user.username, email: user.email };
        },
        events: async () => {
            return Event.find();
        },
        event: async (_, { id }) => {
            return Event.findById(id);
        },
        userEvents: async (_, { userId }) => {
            return Event.find({ creator: userId });
        }
    },
    Mutation: {
        register: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('User already exists with this email');
            const user = new User({ username, email, password });
            await user.save();
            return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.comparePassword(password))) {
                throw new Error('Invalid credentials');
            }
            return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        },
        createEvent: async (_, { title, description, date, price, ticketsAvailable }, context) => {
            const userId = context.userId;
            if (!userId) throw new Error('Unauthorized');
            const event = new Event({
                title,
                description,
                date,
                price,
                ticketsAvailable,
                ticketsSold: 0,
                creator: userId
            });
            await event.save();
            pubsub.publish('UPCOMING_EVENT', { upcomingEvent: event });
            return event;
        },
        buyTicket: async (_, { eventId }, context) => {
            const userId = context.userId;
            if (!userId) throw new Error('Unauthorized');
            const event = await Event.findById(eventId);
            if (!event) throw new Error('Event not found');
            if (event.ticketsAvailable <= event.ticketsSold) throw new Error('No tickets available');
            event.ticketsSold += 1;
            await event.save();
            const ticket = new Ticket({ event: eventId, buyer: userId });
            await ticket.save();
            pubsub.publish('NEW_SALE', { newSale: ticket });
            return ticket;
        }
    },
    Subscription: {
        newSale: {
            subscribe: () => pubsub.asyncIterator(['NEW_SALE']),
        },
        upcomingEvent: {
            subscribe: () => pubsub.asyncIterator(['UPCOMING_EVENT']),
        },
    },
};

module.exports = resolvers;
