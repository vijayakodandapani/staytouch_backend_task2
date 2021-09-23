module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING},
    price: { type: DataTypes.STRING},
    discount: { type: DataTypes.STRING },
    images: { type: DataTypes.JSON },
    image_keys: { type: DataTypes.JSON },
    category: { type: DataTypes.STRING},
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('product'),
};