'use strict';
module.exports = (sequelize, DataTypes) => {
  const Advertisement = sequelize.define('Advertisements', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Advertisement.associate = function(models) {
    // associations can be defined here
  };
  return Advertisement;
};
