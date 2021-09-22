'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    conversation: DataTypes.INTEGER,
  }, {});
  Conversation.associate = function(models) {
    // associations can be defined here
    Conversation.hasMany(models.Conversation_User, { foreignKey: 'conversation_id' });
    Conversation.hasMany(models.Message, { foreignKey: 'conversation_id' });
  };
  return Conversation;
};