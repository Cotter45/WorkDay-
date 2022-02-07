'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    location: DataTypes.STRING,
    team_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.Team, { foreignKey: 'team_id' });
    Project.belongsTo(models.Company, { foreignKey: 'company_id' });
    Project.hasMany(models.Component, { foreignKey: 'project_id', onDelete: 'CASCADE', hooks: true });
    Project.hasMany(models.Image, { foreignKey: 'project_id', onDelete: 'CASCADE', hooks: true });
  };
  return Project;
};