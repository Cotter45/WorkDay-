'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation_User = sequelize.define('Conversation_User', {
    user_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER
  }, {});
  Conversation_User.associate = function(models) {
    // associations can be defined here
    Conversation_User.belongsTo(models.Conversation, { foreignKey: 'conversation_id' });
    Conversation_User.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return Conversation_User;
};