const { User: UserService } = require('../../services');
const {
  saveUser: saveUserSchema,
} = require('../../dto-schemas');
const Validator = require('../../utils/validator');

const signIn = async (_, args) => {
  try {
    const { userName, password } = args;

    const { errors: err, token } = await UserService.signIn({ userName, password });

    if (token) {
      return { token };
    }

    return { errors: err };
  } catch (error) {
    return error;
  }
};

const signUp = async (_, args) => {
  try {
    const { userName, email, password } = args;
    const data = {
      userName, email, password, role: 'admin',
    };
    const { errors } = Validator.isSchemaValid({ data, schema: saveUserSchema });

    if (errors) {
      return { errors };
    }

    const { errors: err, token } = await UserService.signUp(data);

    if (token) {
      return { token };
    }

    return { errors: err };
  } catch (error) {
    return error;
  }
};

module.exports = {
  Mutation: {
    SignIn: signIn,
    SignUp: signUp,
  },
};
