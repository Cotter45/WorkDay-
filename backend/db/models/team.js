'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    company_id: DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
    Team.hasMany(models.User, { foreignKey: 'team_id', onDelete: 'CASCADE', hooks: true });
    Team.belongsTo(models.Company, { foreignKey: 'company_id' });
    Team.hasMany(models.Project, { foreignKey: 'team_id', onDelete: 'CASCADE', hooks: true });
    Team.hasMany(models.Component, { foreignKey: 'team_id', onDelete: 'CASCADE', hooks: true });
    Team.hasMany(models.Image, { foreignKey: 'team_id', onDelete: 'CASCADE', hooks: true });
  };
  return Team;
};