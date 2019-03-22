'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Topics.associate = function(models) {
    Topics.hasMany(models.Post, {
      foreignKey: 'topicId',
      as: 'posts',
    })
  };
  return Topics;
};
