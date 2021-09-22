'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perk = sequelize.define('Perk', {
    perk: DataTypes.STRING
  }, {});
  Perk.associate = function(models) {
    // associations can be defined here
    const companyMap = {
      through: 'Company_Perk',
      foreignKey: 'company_id',
      otherKey: 'perk_id'
    }

    Perk.belongsToMany(models.Company, companyMap);
  };
  return Perk;
};