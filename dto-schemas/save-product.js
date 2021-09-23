const saveProduct = {
  title: 'Add product form',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'name',
      maxLength: 255,
    },
    description: {
      type: 'string',
      description: 'description',
      maxLength: 255,
    },
    price: {
      type: 'string',
      description: 'price',
    },
    discount: {
      type: 'string',
      description: 'discount',
    },
    images: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
  },
  errorMessage: {
    required: {
  
    },
    properties: {
      
    },
  },
  required: [],
  additionalProperties: false,
};

module.exports = saveProduct;
