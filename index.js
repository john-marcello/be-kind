// set up requires for server and db

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

// set up graphql typeDefs queries and resolvers

const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();


// set up apollo server,
// connect to the database with mongoose
// connect to server via port listener
// useUnifiedTopology: true

const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub})
});

mongoose.connect( MONGODB, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => {
        return server.listen({ port: 5000 })
    })
    .then( res => { 
        console.log(`The server is all the way up at ${res.url}`) 
    });


// end file