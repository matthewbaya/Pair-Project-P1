"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, {
        through: models.Shop,
        onDelete: "cascade",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: false,
          notNull: false
        }
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: false,
          notNull: false
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: false,
          notNull: false
        }
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        references: { model: "Category", key: "id" },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
