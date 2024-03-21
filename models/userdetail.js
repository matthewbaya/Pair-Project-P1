"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }

  UserDetail.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: false,
          notNull: false
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: false,
          notNull: false
        }
      },
      role: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserDetail",

      hooks: {
        beforeCreate(instance, options) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        },
      },
    }
  );

  return UserDetail;
};
