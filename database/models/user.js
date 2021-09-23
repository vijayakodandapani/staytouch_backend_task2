module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      public_id: { type: DataTypes.UUID, unique: true, allowNull: false },
      user_name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    },
  );

  return user;
};
