const User = require('./User');
const Transaction = require('./Transaction');
const Income = require('./Income');

User.hasMany(Transaction, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Transaction.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Income, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Income.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { User, Transaction, Income: Income };
