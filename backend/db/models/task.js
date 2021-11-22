'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'userId' });
    Task.hasMany(models.Image, { foreignKey: 'task_id' });
    Task.hasMany(models.Requirement, { foreignKey: 'task_id' });
  };
  return Task;
};