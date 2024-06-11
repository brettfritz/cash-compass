const User = require('./User');
const Transaction = require('./Transaction');
const Category = require('./Category');
const Vendor = require('./Vendor');
const Income = require('./Income');
const Session = require('./Session');

// Associations
User.hasMany(Transaction, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(User, {
  foreignKey: 'user_id'
});

Category.hasMany(Transaction, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(Category, {
  foreignKey: 'category_id'
});

Vendor.hasMany(Transaction, {
  foreignKey: 'vendor_id',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(Vendor, {
  foreignKey: 'vendor_id'
});

User.hasMany(Income, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Income.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Session, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Session.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = {
  User,
  Transaction,
  Category,
  Vendor,
  Income,
  Session
};
