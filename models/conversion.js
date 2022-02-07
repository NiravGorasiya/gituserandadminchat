'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversion.init({
    user_id: DataTypes.STRING,
    message: DataTypes.STRING,
    receiver_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conversion',
  });
  return Conversion;
};