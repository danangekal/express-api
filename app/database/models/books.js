module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    tableName: 'books',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Books;
};
