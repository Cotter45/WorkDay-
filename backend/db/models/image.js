'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageUrl: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.User, { foreignKey: 'user_id' });
    Image.belongsTo(models.Post, { foreignKey: 'post_id' });
    Image.belongsTo(models.Comment, { foreignKey: 'comment_id' });
    Image.belongsTo(models.Project, { foreignKey: 'project_id' });
    Image.belongsTo(models.Team, { foreignKey: 'team_id' });
    Image.belongsTo(models.Company, { foreignKey: 'company_id' });
    Image.belongsTo(models.Task, { foreignKey: 'task_id' });
  };
  return Image;
};