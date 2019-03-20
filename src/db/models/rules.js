'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rules = sequelize.define('Rules', {
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Rules.associate = function(models) {
    Rules.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    })
  };
  return Rules;
};
