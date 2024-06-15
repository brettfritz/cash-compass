const User = require('./User');
const Transaction = require('./Transaction');
const Category = require('./Category');
const Vendor = require('./Vendor');
const Income = require('./Income');
const Session = require('./Session');

// Associations
User.hasMany(Transaction, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(User, {
  foreignKey: 'userId'
});

Category.hasMany(Transaction, {
  foreignKey: 'categoryId',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(Category, {
  foreignKey: 'categoryId'
});

Vendor.hasMany(Transaction, {
  foreignKey: 'vendorId',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(Vendor, {
  foreignKey: 'vendorId'
});

User.hasMany(Income, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Income.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Session, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Session.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Transaction,
  Category,
  Vendor,
  Income,
  Session
};
