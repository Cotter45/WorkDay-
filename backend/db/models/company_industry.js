'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company_Industry = sequelize.define('Company_Industry', {
    company_id: DataTypes.INTEGER,
    industry_id: DataTypes.INTEGER
  }, {});
  Company_Industry.associate = function(models) {
    // associations can be defined here
  };
  return Company_Industry;
};