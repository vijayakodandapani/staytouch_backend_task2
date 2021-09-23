const getProducts = {
  title: 'Products list form',
  description: 'Defines the structure for HTTP POST request body',
  type: 'object',
  properties: {
    pageSize: {
      type: 'integer',
      description: 'pageSize',
      enum: [
        10,
        20,
        30,
        40,
        50,
        100,
        500,
      ],
    },
    pageNumber: {
      type: 'integer',
      description: 'pageNumber',
      minimum: 1,
    },
    filters: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'key name',
            enum: [ 'publicId', 'name', 'description', 'price', 'discount', 'images', 'category', 'createdAt', 'updatedAt' ],
          },
          in: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          nin: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          like: { type: 'string' },
          ilike: { type: 'string' },
          eq: { type: 'string' },
          neq: { type: 'string' },
          gt: { type: 'string' },
          gte: { type: 'string' },
          lt: { type: 'string' },
          lte: { type: 'string' },
        },
        required: [
          'key',
        ],
        oneOf: [
          {
            properties: {
              like: {
                type: 'string',
              },
            },
            required: [
              'like',
            ],
          },
          {
            properties: {
              ilike: {
                type: 'string',
              },
            },
            required: [
              'ilike',
            ],
          },
          {
            properties: {
              in: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            required: [
              'in',
            ],
          },
          {
            properties: {
              nin: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
            required: [
              'nin',
            ],
          },
          {
            properties: {
              eq: {
                type: 'string',
              },
            },
            required: [
              'eq',
            ],
          },
          {
            properties: {
              neq: {
                type: 'string',
              },
            },
            required: [
              'neq',
            ],
          },
          {
            properties: {
              gt: {
                type: 'string',
              },
            },
            required: [
              'gt',
            ],
          },
          {
            properties: {
              gte: {
                type: 'string',
              },
            },
            required: [
              'gte',
            ],
          },
          {
            properties: {
              lt: {
                type: 'string',
              },
            },
            required: [
              'lt',
            ],
          },
          {
            properties: {
              lte: {
                type: 'string',
              },
            },
            required: [
              'lte',
            ],
          },
        ],
        minProperties: 2,
        maxProperties: 2,
        errorMessage: {
          required: {
            key: 'Parameter: key in body is required',
          },
          properties: {
            key: 'Parameter: key must be valid string',
          },
        },
      },
      minItems: 1,
    },
    sorting: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'key name',
          },
          direction: {
            type: 'string',
            enum: [
              'ASC',
              'DESC',
            ],
          },
        },
        required: [
          'key',
          'direction',
        ],
        errorMessage: {
          required: {
            key: 'Parameter: key in body is required',
            direction: 'Parameter: direction in body is required',
          },
          properties: {
            key: 'Parameter: key must be valid string',
            direction: 'Parameter: direction should have one of the given statuses',
          },
        },
      },
      minItems: 1,
    },
  },
  errorMessage: {
    required: {
      pageSize: 'Parameter: pageSize is required in the body.',
      pageNumber: 'Parameter: pageNumber is required in the body.',
    },
    properties: {
      pageSize: 'Parameter: pageSize should be valid.',
      pageNumber: 'Parameter: pageNumber should be valid.',
    },
  },
};

module.exports = getProducts;
