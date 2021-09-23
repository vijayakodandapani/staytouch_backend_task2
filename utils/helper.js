const convertCamelCase = require('lodash.camelcase');
const convertSnakeCase = require('lodash.snakecase');
const axios = require('axios');
const crypto = require('crypto');

const convertCamelObjectToSnake = (payload) => {
  const obj = { ...payload };
  const response = {};
  const objectKeys = Object.keys(obj);

  objectKeys.map((key) => {
    const convertedKey = convertSnakeCase(key);

    response[convertedKey] = obj[key];

    return true;
  });

  return response;
};

const convertCamelToSnake = (payload) => {
  const payloadDataType = typeof payload;

  switch (payloadDataType) {
    case 'string':
      return convertSnakeCase(payload);

    case 'object':
      return convertCamelObjectToSnake(payload);

    default:
      return payload;
  }
};

const convertSnakeObjectToCamel = (payload) => {
  const obj = {
    ...payload,
  };
  const response = {};
  const objectKeys = Object.keys(obj);

  objectKeys.map((key) => {
    const convertedKey = convertCamelCase(key);

    if (obj[key] && Object.prototype.toString.call(obj[key]) === '[object Object]' && !(obj[key] instanceof Date)) {
      const {
        dataValues,
      } = obj[key];

      let result;

      if (dataValues) {
        result = convertSnakeObjectToCamel(dataValues);
      } else {
        result = convertSnakeObjectToCamel(obj[key]);
      }

      response[convertedKey] = result;
    } else if (obj[key] && Object.prototype.toString.call(obj[key]) === '[object Array]' && !(obj[key] instanceof Date)) {
      const rows = [];

      obj[key].forEach((element) => {
        const {
          dataValues: dataValues2,
        } = element;

        let result;

        if (dataValues2) {
          if (Object.prototype.toString.call(dataValues2) === '[object Object]') {
            result = convertSnakeObjectToCamel(dataValues2);
          } else {
            result = dataValues2;
          }
        } else if (Object.prototype.toString.call(element) === '[object Object]') {
          result = convertSnakeObjectToCamel(element);
        } else {
          result = element;
        }
        rows.push(result);
      });

      response[convertedKey] = rows;
    } else {
      response[convertedKey] = obj[key];
    }

    return true;
  });

  return response;
};

const convertSnakeToCamel = (payload) => {
  const payloadDataType = typeof payload;

  switch (payloadDataType) {
    case 'string':
      return convertCamelCase(payload);

    case 'object':
      return convertSnakeObjectToCamel(payload);

    default:
      return payload;
  }
};

const convertKababToNormal = (payload) => {
  const payloadDataType = typeof payload;

  switch (payloadDataType) {
    case 'string':
      return convertCamelCase(payload);

    case 'object':
      return convertSnakeObjectToCamel(payload);

    default:
      return payload;
  }
};

const sanitizeStr = (regex, str, data) => {
  const sanitizedStr = str.replace(regex, data);

  return sanitizedStr;
};

const postRequest = async ({ url, data, headers }) => {
  try {
    const response = await axios({
      url: `${url}`,
      method: 'post',
      data,
      headers: headers || {
        'cache-control': 'no-cache',
      },
    });

    return response;
  } catch (error) {
    const { response: { status } } = error || { response: {} };

    if (status === 404) {
      return { errors: [ { name: 'server', message: 'Request validation error.' } ] };
    }
    if (status === 400) {
      return { errors: [ { name: 'server', message: 'Resources are not available' } ] };
    }

    return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time' } ] };
  }
};

const getRequest = async ({ url, headers }) => {
  try {
    const response = await axios({
      url: `${url}`,
      method: 'get',
      headers,
    });

    return response;
  } catch (error) {
    const { response: { status } } = error || { response: {} };

    if (status === 404) {
      return { errors: [ { name: 'server', message: 'Resources are not available.' } ] };
    }

    return { errors: [ { name: 'server', message: 'There is some issue, Please try after some time.' } ] };
  }
};

const generateRandomPassword = () => {
  const password = crypto.randomBytes(3).toString('hex');

  return password;
};

const convertToSlug = (string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string.toString().toLowerCase()
  // Replace spaces with -
    .replace(/\s+/g, '-')
    // Replace special characters
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    // Replace & with 'and'
    .replace(/&/g, '-and-')
    // Remove all non-word characters
    .replace(/[^\w\-\\]+/g, '')
  // Replace multiple - with single -
    // .replace(/\-\-+/g, '-')
    // Trim - from start of text
    .replace(/^-+/, '')
    // Trim - from end of text
    .replace(/-+$/, '');
};

const generateWhereCondition = (data) => {
  const where = (data || []).map((element) => {
    const { key: KeyCamelCase, ...values } = element;
    const key = convertSnakeCase(KeyCamelCase);
    const [ secondKey ] = Object.keys(values);

    if (secondKey === 'eq') {
      return `${key} = '${values[secondKey]}'`;
    }
    if (secondKey === 'in') {
      return `${key} in ('${values[secondKey].join("','")}')`;
    }
    if (secondKey === 'nin') {
      return `${key} not in ('${values[secondKey].join("','")}')`;
    }
    if (secondKey === 'neq') {
      return `${key} != '${values[secondKey]}'`;
    }
    if (secondKey === 'gt') {
      return `${key} > '${values[secondKey]}'`;
    }
    if (secondKey === 'gte') {
      return `${key} >= '${values[secondKey]}'`;
    }
    if (secondKey === 'lt') {
      return `${key} < '${values[secondKey]}'`;
    }
    if (secondKey === 'lte') {
      return `${key} <= '${values[secondKey]}'`;
    }
    if (secondKey === 'like') {
      return `${key} like '%${values[secondKey]}%'`;
    }
    if (secondKey === 'ilike') {
      return `${key} ilike '%${values[secondKey]}%'`;
    }

    return `${key} = '${values}'`;
  });

  if (where.length > 0) {
    return `where ${where.join(' AND ')}`;
  }

  return '';
};

const generateOrderCondition = (data) => {
  let direction;
  const order = (data || []).map((element) => {
    const { key, direction: directionOrder } = element;

    direction = directionOrder;

    return convertSnakeCase(key);
  });

  if (order.length > 0) {
    return `order by ${order.join(',')} ${direction}`;
  }

  return '';
};

module.exports = {
  convertCamelObjectToSnake,
  convertCamelToSnake,
  convertSnakeObjectToCamel,
  convertSnakeToCamel,
  convertKababToNormal,
  sanitizeStr,
  postRequest,
  getRequest,
  generateRandomPassword,
  convertToSlug,
  generateWhereCondition,
  generateOrderCondition,
};
