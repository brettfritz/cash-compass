// /models/Transaction.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    cost:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'category',
        key: 'id',
      }
    },
    vender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vendor',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction'
  }
);

module.exports = Transaction;
