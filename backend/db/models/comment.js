'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    image_url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id' });
    Comment.hasMany(models.Like, { foreignKey: 'comment_id' });
    Comment.hasMany(models.Image, { foreignKey: 'comment_id' });
  };
  return Comment;
};