const { mergeTypeDefs } = require('@graphql-tools/merge');

const Scaler = require('./scaler');
const Comman = require('./comman');
const User = require('./user');
const Product = require('./product');


const types = [
  Scaler,
  Comman,
  User,
  Product,
  // Images,
];
module.exports = mergeTypeDefs(types);
