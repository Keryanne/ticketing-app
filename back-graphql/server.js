const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const connectDB = require('./config/database');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Authentication function
const authenticate = (req) => {
    const token = req.header('x-auth-token')
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.id;
        } catch (err) {
            console.error('Invalid token');
        }
    } else {
        console.error('No token provided');
    }
    return null; // Return null if authentication fails
};

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const userId = authenticate(req);
        return { req, userId };
    },
    formatError: (err) => {
        return {
            message: err.message,
            locations: err.locations,
            path: err.path,
            extensions: {
                code: err.extensions.code,
                exception: {
                    stacktrace: err.extensions.exception.stacktrace
                }
            }
        };
    }
});

const app = express();
app.use(express.json());

// Apply Apollo Server as middleware to your Express app
server.start().then(() => {
    server.applyMiddleware({ app });

    // Start Express server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
