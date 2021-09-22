'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
    requirement: DataTypes.STRING,
    job_id: DataTypes.INTEGER
  }, {});
  Requirement.associate = function(models) {
    // associations can be defined here
    Requirement.belongsTo(models.Job, { foreignKey: 'job_id' });
  };
  return Requirement;
};