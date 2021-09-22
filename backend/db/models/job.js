'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    pay: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    poster_id: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.Company, { foreignKey: 'company_id' });
    Job.belongsTo(models.User, { foreignKey: 'poster_id' });
    Job.hasMany(models.Save_for_Later, { foreignKey: 'job_id' });
    Job.hasMany(models.Requirement, { foreignKey: 'job_id' });
    Job.hasMany(models.Application, { foreignKey: 'job_id' });
  };
  return Job;
};