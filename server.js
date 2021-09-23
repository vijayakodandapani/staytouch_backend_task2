
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginInlineTraceDisabled } = require('apollo-server-core');

const { typeDefs, resolvers } = require('./graphql');

const routes = require('./routes');

const { PORT } = require('./config');

const app = express();

const schema = buildFederatedSchema({
  typeDefs,
  resolvers,
});

/**
 * Start the app by listening <port>
 * */
const server = app.listen(PORT);

/**
 * List of all middlewares used in project cors, compression, helmet
 * */
try {
  app.use(cors({
    exposedHeaders: [ ],
  }));
  app.use(compression());
  app.use(helmet());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(express.json());

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
      headers: req.headers,
    }),
    plugins: [ ApolloServerPluginInlineTraceDisabled() ],
  });

  app.use('/', routes);

  apolloServer.applyMiddleware({ app });
} catch (e) {
  server.close();
}

module.exports = server;
