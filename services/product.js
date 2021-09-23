const {
  v1: uuidV1
} = require('uuid');
const s3 = require('./../utils/config');
const {
  promisify
} = require('util');
const {
  getUrl
} = require('./../utils/object');
const {
  extname
} = require('path');
const {
  product: productModel,
  sequelize,
} = require('../database');
const {
  CostExplorer
} = require('aws-sdk');
const Helper = require('./../utils/helper');
this.s3 = s3;
const {
  getUser
} = require('./auth');

const checkAuthorization = async (authorization) => {
  const parts = authorization.split(' ');

  const bearer = parts[0];

  const token = parts[1];

  if (bearer === 'Bearer') {
      const user = getUser(token);

      if (user.error) {
          return {
              errors: [{
                  name: 'Authentication',
                  message: user.msg
              }]
          };
      }

      return {
          user
      };
  }

  return {
      errors: [{
          name: 'Authentication',
          message: 'Authentication must use Bearer'
      }]
  };
};

const getList = async (payload, authorization) => {
  const {
      pageSize,
      pageNumber,
      filters,
      sorting,
  } = payload;
  if (authorization) {
      await checkAuthorization(authorization);
      const limit = pageSize;
      const offset = limit * (pageNumber - 1);
      const where = Helper.generateWhereCondition(filters);
      const order = Helper.generateOrderCondition(sorting);
      const attributes = ['name', 'description', 'price',
          'discount', 'category', 'images','public_id',
      ];

      const response = await sequelize.query(`SELECT ${attributes} FROM public.product ${where} ${order} OFFSET ${offset} LIMIT ${limit}`, {
          nest: true,
          type: sequelize.QueryTypes.SELECT,
      });

      if (response.length > 0) {
          const count = response.length;

          const doc = response.map((element) => Helper.convertSnakeToCamel(element));
        //   console.log(doc);

          return {
              count,
              doc
          };
      }

      return {
          count: 0,
          doc: []
      };
  }

  return {
      errors: [{
          name: 'Authenticated',
          message: 'User must be authenticated'
      }]
  };
};

const getDetailById = async (payload, authorization) => {
  const {
      publicId
  } = payload;

  if (authorization) {
      await checkAuthorization(authorization);

      const response = await productModel.findOne({
          where: {
              public_id: publicId
          },
      });

      if (response) {
          const {
              dataValues
          } = response;
          const doc = Helper.convertSnakeToCamel(dataValues);

          return {
              doc
          };
      }

      return {};
  }

  return {
      errors: [{
          name: 'Authenticated',
          message: 'User must be authenticated'
      }]
  };
};

const save = async (payload, authorization) => {
    // console.log(payload)
  const {
      name,
      description,
      price,
      discount,
      category,
      files,
      bucketName
  } = payload;
  const transaction = await sequelize.transaction();

  try {
      if (authorization) {
          await checkAuthorization(authorization);
          let params = {
              Bucket: bucketName,
              Key: '',
              Body: '',
              ACL: 'public-read'
          };
          let objects = [];
          let object = [];
          let keys = [];
          const transaction = await sequelize.transaction();
          for (let i = 0; i < files.length; i++) {

              let file = files[i];
            //   console.log(file);

              let {
                  createReadStream,
                  filename
              } = await file;

              let stream = createReadStream();

              stream.on("error", (error) => console.error(error));

              params.Body = stream;

              let timestamp = new Date().getTime();

              let file_extension = extname(filename);

              params.Key = `images/${timestamp}${file_extension}`;

              let upload = promisify(this.s3.upload.bind(this.s3));


              let result = await upload(params).catch(console.log);

              if (result) {
                  object.push(result.Location);
                  keys.push(result.Key);
              }


          }
          const publicId = uuidV1();

          await productModel.create({
              name: name,
              description: description,
              discount: discount,
              price: price,
              images: object,
              category: category,
              image_keys: keys,
              public_id: publicId,
          }, {
              transaction
          });

          await transaction.commit();

          return {
              doc: {
                  publicId
              }
          };


      }
      await transaction.rollback();

      return {
          errors: [{
              name: 'Authenticated',
              message: 'User must be authenticated'
          }]
      };
  } catch (error) {
      console.log(error);
      await transaction.rollback();

      return {
          errors: [{
              name: 'email',
              message: 'Insertion failed.'
          }]
      };
  }
};

const patch = async (payload, authorization) => {

  let {
      publicId,
      ...data
  } = payload;

  const transaction = await sequelize.transaction();

  try {
      if (authorization) {
          await checkAuthorization(authorization);
          const response = await productModel.findOne({
              where: {
                  public_id: publicId
              },
              transaction
          });
          if (response) {
              if(data.files){

                const params = {
                    Bucket: data.bucketName,
                    Delete: {
                        Objects: []
                    }
                };
                response.image_keys.forEach((objectKey) => params.Delete.Objects.push({
                    Key: objectKey
                }));
  
                let removeObjects = promisify(this.s3.deleteObjects.bind(this.s3));
  
                let result = await removeObjects(params).catch(console.log);
                let params1 = {
                    Bucket: data.bucketName,
                    Key: '',
                    Body: '',
                    ACL: 'public-read'
                };
                let objects = [];
                let object = [];
                let keys = [];

              if (result) {

                for (let i = 0; i < data.files.length; i++) {

                    let file = data.files[i];
                    let {
                        createReadStream,
                        filename
                    } = await file;

                    let stream = createReadStream();

                    stream.on("error", (error) => console.error(error));

                    params1.Body = stream;

                    let timestamp = new Date().getTime();

                    let file_extension = extname(filename);

                    params1.Key = `images/${timestamp}${file_extension}`;

                    let upload = promisify(this.s3.upload.bind(this.s3));


                    let result = await upload(params1).catch(console.log);
                    const doc = {
                        ...Helper.convertCamelToSnake(data)
                    };
                    if (result) {
                        object.push(result.Location);
                        keys.push(result.Key);
                        doc.images = object
                        doc.image_keys = keys
                    }

                    await productModel.update(doc, {
                        where: {
                            public_id: publicId
                        },
                        transaction
                    });
                    await transaction.commit();

                    return {
                        doc: {
                            publicId
                        }
                    };
                }
                
            }
                  
              }
              else{
                const doc = {
                    ...Helper.convertCamelToSnake(data)
                };
                await productModel.update(doc, {
                    where: {
                        public_id: publicId
                    },
                    transaction
                });
                await transaction.commit();

                return {
                    doc: {
                        publicId
                    }
                };
              }
            

            
             
              
          }
          await transaction.rollback();

                  return {
                      errors: [{
                          name: 'publicId',
                          message: 'invalid publicId.'
                      }]
                  };
      }
          await transaction.rollback();

              return {
                  errors: [{
                      name: 'Authenticated',
                      message: 'User must be authenticated'
                  }]
              };
      

  } catch (err) {
      await transaction.rollback();

      return {
          errors: [{
              name: 'transaction',
              message: 'transaction failed.'
          }]
      };
  }

};

const deleteProduct = async (payload, authorization) => {
  const {
      publicId
  } = payload;
  const transaction = await sequelize.transaction();

  try {
      if (authorization) {
          await checkAuthorization(authorization);
          const response = await productModel.findOne({
              where: {
                  public_id: publicId
              },
              transaction
          });

          if (response) {
              await productModel.destroy({
                  where: {
                      public_id: publicId
                  },
                  transaction
              });
              await transaction.commit();

              return {
                  doc: {
                      publicId
                  }
              };
          }
          await transaction.rollback();

          return {
              errors: [{
                  name: 'publicId',
                  message: 'invalid publicId.'
              }]
          };
      }
      await transaction.rollback();

      return {
          errors: [{
              name: 'Authenticated',
              message: 'User must be authenticated'
          }]
      };
  } catch (err) {
      await transaction.rollback();

      return {
          errors: [{
              name: 'transaction',
              message: 'transaction failed.'
          }]
      };
  }
};

module.exports = {
  getList,
  getDetailById,
  save,
  patch,
  deleteProduct,
};