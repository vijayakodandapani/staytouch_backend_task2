const database = require('./../database');
const { DATABASE: { name: databaseName } } = require('./../config');

const { SequelizeMeta } = database;

const status = async () => {
  let version = null;

  try {
    await database.authenticate();

    const data = await SequelizeMeta.findOne({
      attributes: [ 'name' ],
      order: [ [ 'name', 'DESC' ] ],
    });

    if (data) {
      const { dataValues: { name } } = data;

      version = name;
    }

    return ({
      name: databaseName,
      status: 'success',
      type: 'database',
      version,
    });
  } catch (error) {
    return ({
      name: databaseName,
      status: 'failure',
      type: 'database',
      version,
    });
  }
};

module.exports = { status };
