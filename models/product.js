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

    get formatDate() {
      let date = new Date(this.createdAt);
      let today = new Date();

      let min = Math.floor((today - date) / 60000);
      let h = Math.floor(min / 60);
      let m = min % 60;
      if (h > 0) {
        return `${h} hours ago`;
      } else {
        return `${m} minutes ago`;
      }
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
      picture: {
        type: DataTypes.STRING,
        defaultValue: 'https://www.the-sun.com/wp-content/uploads/sites/6/2023/10/www-instagram-com-monkeycatluna-hl-851711797.jpg?strip=all&w=960'
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
