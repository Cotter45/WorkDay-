'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    poster_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: 'poster_id' });
    Post.belongsTo(models.Company, { foreignKey: 'company_id' });
    Post.hasMany(models.Comment, { foreignKey: 'post_id', onDelete: 'CASCADE', hooks: true });
    Post.hasMany(models.Like, { foreignKey: 'post_id', onDelete: 'CASCADE', hooks: true });
    Post.hasMany(models.Image, { foreignKey: 'post_id', onDelete: 'CASCADE', hooks: true });
  };
  return Post;
};