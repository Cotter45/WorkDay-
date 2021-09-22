'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company_Perk = sequelize.define('Company_Perk', {
    perk_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  Company_Perk.associate = function(models) {
    // associations can be defined here
  };
  return Company_Perk;
};