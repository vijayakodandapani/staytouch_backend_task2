
const User = require('./user');
const Product = require('./product');
module.exports = {
  Query: {
    ...Product.Query,
  },
  Mutation: {
    ...User.Mutation,
    ...Product.Mutation,
  },
};
