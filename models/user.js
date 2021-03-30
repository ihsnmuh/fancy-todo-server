"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasMany(models.Todo);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `Username is required!`,
          },
        },
        unique: {
          args: true,
          msg: `Username has been taken!`,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: `Invalid email format`,
          },
          notEmpty: {
            msg: `Email is required!`,
          },
        },
        unique: {
          args: true,
          msg: `Email has been taken!`,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password is required!",
          },
          len: {
            args: [7, 100],
            msg: "Password must be more than 7 characters",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
