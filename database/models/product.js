module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING},
      price: { type: DataTypes.STRING },
      discount:{ type: DataTypes.STRING},
      images:{ type: DataTypes.JSON},
      image_keys:{ type: DataTypes.JSON},
      category:{ type: DataTypes.STRING}
      
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    },
  );

  return product;
};
