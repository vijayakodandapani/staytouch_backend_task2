const saveStudent = {
  title: 'Add student form',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      description: 'firstName',
      maxLength: 255,
    },
    email: {
      type: 'string',
      description: 'email of the user',
      format: 'email',
    },
    role: {
      type: 'string',
    },
    password: {
      type: 'string',
      description: 'Password.',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,15}$',
    },

  },
  errorMessage: {
    required: {
      email: 'Parameter: email is required in the body.',
      userName: 'Parameter: userName is required in the body.',
      password: 'Parameter: password is required in the body.',
    },
    properties: {
      email: 'Parameter: email should be valid.',
      userName: 'Parameter: userName should be valid.',
      password: 'Parameter: password should be valid.should be min 8 and max 15 char, alteat one small letter, one special and one capital with number.',
    },
  },
  required: [ 'email', 'userName', 'password' ],
  additionalProperties: false,
};

module.exports = saveStudent;
