'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Topics.associate = function(models) {
    Topics.hasMany(models.Banner, {
      foreignKey: 'topicId',
      as: 'banners',
    });
    Topics.hasMany(models.Rules, {
      foreignKey: 'topicId',
      as: 'rules',
    });
  };
  return Topics;
};
