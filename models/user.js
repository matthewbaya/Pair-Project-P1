"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail, { foreignKey: "UserId" });
      User.belongsToMany(models.Product, {
        through: models.Shop,
        onDelete: "cascade",
      });
    }
  }

  User.init(
    {
      name: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: false,
        notNull: false
      }
      },
      address: {
        type: DataTypes.STRING,
        validate : {
          notEmpty: false,
          notNull: false
        }
        },
      dateOfBirth: {
        type: DataTypes.DATE,
        validate : {
          notEmpty: false,
          notNull: false
        }
        },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
