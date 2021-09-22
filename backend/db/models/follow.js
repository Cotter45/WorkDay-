'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    user_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    other_user: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here

    Follow.belongsTo(models.User, { foreignKey: 'user_id' });
    Follow.belongsTo(models.User, { foreignKey: 'other_user' });
    Follow.belongsTo(models.Company, { foreignKey: 'company_id' });
  };
  return Follow;
};