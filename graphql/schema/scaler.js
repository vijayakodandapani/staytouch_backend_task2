const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const { makeExecutableSchema } = require('apollo-server');

const GraphQLDateTime = require('graphql-type-datetime');

const GraphQLUuid = require('graphql-type-uuid');

const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  UUID: GraphQLUuid,
};

const typeDefs = `
scalar DateTime
scalar JSON
scalar JSONObject
scalar Date
scalar UUID
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
