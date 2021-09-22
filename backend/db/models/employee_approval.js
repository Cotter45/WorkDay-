'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee_Approval = sequelize.define('Employee_Approval', {
    user_id: DataTypes.INTEGER,
    validated: DataTypes.BOOLEAN,
    company_id: DataTypes.INTEGER
  }, {});
  Employee_Approval.associate = function(models) {
    // associations can be defined here
    Employee_Approval.belongsTo(models.User, { foreignKey: 'user_id' });
    Employee_Approval.belongsTo(models.Company, { foreignKey: 'company_id' });
  };
  return Employee_Approval;
};