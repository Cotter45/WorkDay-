'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: DataTypes.INTEGER,
    work_life: DataTypes.INTEGER,
    perks: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    reviewer_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'reviewer_id' });
    Review.belongsTo(models.User, { foreignKey: 'user_id' });
    Review.belongsTo(models.Company, { foreignKey: 'company_id' });
  };
  return Review;
};