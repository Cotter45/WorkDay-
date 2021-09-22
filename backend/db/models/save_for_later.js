'use strict';
module.exports = (sequelize, DataTypes) => {
  const Save_for_Later = sequelize.define('Save_for_Later', {
    job_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Save_for_Later.associate = function(models) {
    // associations can be defined here
    Save_for_Later.belongsTo(models.Job, { foreignKey: 'job_id' });
    Save_for_Later.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Save_for_Later;
};