"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      Shop.belongsTo
=======
      Shop.belongsTo(models.User);
      Shop.belongsTo(models.Product);
>>>>>>> 7c9822d210c2dc52388244af9d5bf4d34490bc5b
    }
  }

  Shop.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Shop',
  });

  return Shop;
};
