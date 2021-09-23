const { v1: uuidV1 } = require('uuid');
const {
  user: UserModel, sequelize,
} = require('../database');
const Helper = require('./../utils/helper');

const { createToken } = require('./auth');

const bcrypt = require('bcrypt');

const signIn = async (payload) => {
  const { userName, password } = payload;

  const transaction = await sequelize.transaction();

  try {
    const user = await UserModel.findOne({ where: { user_name: userName }, transaction });

    if (!user) {
      await transaction.rollback();

      return { errors: [ { name: 'user', message: 'No user found' } ] };
    }
    const { dataValues } = user;
    const doc = Helper.convertSnakeToCamel(dataValues);
    const { password: hashedPassword } = doc;

    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
      return { errors: [ { name: 'user', message: 'Invalid Password' } ] };
    }
    const expiresIn = '60m';

    return { token: createToken(doc, expiresIn) };
  } catch (error) {
    await transaction.rollback();

    return { errors: [ { name: 'email', message: 'transaction failed.' } ] };
  }
};

const signUp = async (payload) => {
  const {
    userName, password, email, role,
  } = payload;

  const transaction = await sequelize.transaction();

  try {
    const isEmailExists = await UserModel.findOne({ where: { email }, transaction });

    if (isEmailExists) {
      await transaction.rollback();

      return { errors: [ { name: 'email', message: 'duplicate entry.' } ] };
    }

    const publicId = uuidV1();

    const hashPassword = await bcrypt.hash(password, 16);

    const user = await UserModel.create({
      public_id: publicId,
      user_name: userName,
      email,
      password: hashPassword,
      role,
    });

    await transaction.commit();
    const expiresIn = '60m';
    const { dataValues } = user;
    const doc = Helper.convertSnakeToCamel(dataValues);
    const createdToken = createToken(doc, expiresIn);

    return { token: createdToken };
  } catch (error) {
    await transaction.rollback();

    return { errors: [ { name: 'email', message: 'transaction failed.' } ] };
  }
};

module.exports = {
  signIn,
  signUp,
};
