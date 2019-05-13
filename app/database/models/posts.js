module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    freezeTableName: true,
    tableName: 'posts',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Posts;
};
