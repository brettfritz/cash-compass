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
      type: Datatypes.DATE,
      allowNull: false,
      defaultValue: Datatypes.NOW
    },
    cost:{
      type: Datatypes.FLOAT,
      allowNull: false
    },
    category_id: {
      type: Datatype.INTEGER,
      reference: {
        model: 'category',
        key: 'id',
      }
    },
    vender_id: {
      type: Datatypes.INTEGER,
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
