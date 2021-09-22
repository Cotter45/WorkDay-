'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsTo(models.User, { foreignKey: 'user_id' });
    Role.belongsTo(models.Company, { foreignKey: 'company_id' });
  };
  return Role;
};