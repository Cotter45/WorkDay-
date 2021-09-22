'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    conversation: DataTypes.INTEGER,
  }, {});
  Conversation.associate = function(models) {
    // associations can be defined here

    const conversationUser = {
      through: 'Conversation_User',
      foreignKey: 'user_id',
      otherKey: 'conversation_id'
    }

    Conversation.belongsToMany(models.User, conversationUser);
    Conversation.hasMany(models.Message, { foreignKey: 'conversation_id' });
  };
  return Conversation;
};