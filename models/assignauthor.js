'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignAuthor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssignAuthor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssignAuthor',
  });
  return AssignAuthor;
};