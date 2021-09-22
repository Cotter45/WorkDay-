'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
    Application.belongsTo(models.User, { foreignKey: 'user_id' });
    Application.belongsTo(models.Job, { foreignKey: 'job_id' });
  };
  return Application;
};