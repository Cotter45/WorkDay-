'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    background_image: DataTypes.STRING,
    description: DataTypes.STRING,
    num_employees: DataTypes.INTEGER,
    founded: DataTypes.DATE,
    location: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    const industryMap = {
      through: 'Company_Industry',
      foreignKey: 'industry_id',
      otherKey: 'company_id'
    }

    const perkMap = {
      through: 'Company_Perk',
      foreignKey: 'perk_id',
      otherKey: 'company_id'
    }

    Company.belongsToMany(models.Industry, industryMap);
    Company.belongsToMany(models.Perk, perkMap);
    Company.hasMany(models.User, { foreignKey: 'current_company' });
    Company.hasMany(models.Employee_Approval, { foreignKey: 'company_id' });
    Company.hasMany(models.Follow, { foreignKey: 'company_id' });
    Company.hasMany(models.Team, { foreignKey: 'company_id' });
    Company.hasMany(models.Role, { foreignKey: 'company_id' });
    Company.hasMany(models.Review, { foreignKey: 'company_id' });
    Company.hasMany(models.Job, { foreignKey: 'company_id' });
    Company.hasMany(models.Post, { foreignKey: 'company_id' });
    Company.hasMany(models.Like, { foreignKey: 'company_id' });
    Company.hasMany(models.Project, { foreignKey: 'company_id' });
    Company.hasMany(models.Company, { foreignKey: 'company_id' });
    Company.hasMany(models.Company, { foreignKey: 'company_id' });


  };
  return Company;
};