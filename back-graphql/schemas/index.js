const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event]
    }

    type Event {
        id: ID!
        title: String!
        description: String!
        date: String!
        price: Int!
        ticketsAvailable: Int!
        ticketsSold: Int!
        creator: User
    }

    type Ticket {
        id: ID!
        event: Event!
        buyer: User!
    }

    type Query {
        me: User
        events: [Event]
        event(id: ID!): Event
        userEvents(userId: ID!): [Event]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
        login(email: String!, password: String!): String
        createEvent(title: String!, description: String!, date: String!, price: Int!, ticketsAvailable: Int!): Event
        buyTicket(eventId: ID!): Ticket
    }

    type Subscription {
        newSale: Ticket
        upcomingEvent: Event
    }
`;

module.exports = typeDefs;
