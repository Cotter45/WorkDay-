'use strict';
module.exports = (sequelize, DataTypes) => {
  const Industry = sequelize.define('Industry', {
    name: DataTypes.STRING
  }, {});
  Industry.associate = function(models) {
    // associations can be defined here
    const companyMap = {
          through: 'Company_Industry',
          foreignKey: 'company_id',
          otherKey: 'industry_id'
    }

    Industry.belongsToMany(models.Company, companyMap)

  };
  return Industry;
};