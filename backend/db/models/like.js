'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, { foreignKey: 'user_id' });
    Like.belongsTo(models.Post, { foreignKey: 'post_id' });
    Like.belongsTo(models.Comment, { foreignKey: 'comment_id' });
    Like.belongsTo(models.Company, { foreignKey: 'company_id' });
  };
  return Like;
};