'use strict';
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    component: DataTypes.STRING,
    contents: DataTypes.TEXT,
    parent_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  Component.associate = function(models) {
    // associations can be defined here
    Component.belongsTo(models.Component, { foreignKey: 'parent_id' });
    Component.hasMany(models.Component, { foreignKey: 'parent_id' });
    Component.belongsTo(models.User, { foreignKey: 'user_id' });
    Component.belongsTo(models.Project, { foreignKey: 'project_id' });
    Component.belongsTo(models.Team, { foreignKey: 'team_id' });
    Component.belongsTo(models.Company, { foreignKey: 'company_id' });
  };
  return Component;
};