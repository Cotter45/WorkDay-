'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Task;
};