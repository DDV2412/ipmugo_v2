'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AssignEditor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AssignEditor.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AssignEditor',
  });
  return AssignEditor;
};