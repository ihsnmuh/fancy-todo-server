'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your description'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your status'
        }
      }
    }, 
    due_date: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter your date'
        }
      }
    } //Validasi gaboleh tanggal yang udah lewat minimal hari ini cari di validation duedate
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};