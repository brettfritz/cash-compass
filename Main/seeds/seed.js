const sequelize = require('../config/connection');
const { User, Transaction, Category, Vendor, Budget } = require('../models');

const userData = require('./seedUsers.json');
const transactionData = require('./seedTransactions.json');
const categoryData = require('./seedCategories.json');
const vendorData = require('./seedVendors.json');
const incomeData = require('./seedIncome.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Category.bulkCreate(categoryData, {
    returning: true,
  });

  await Vendor.bulkCreate(vendorData, {
    returning: true,
  });

  await Budget.bulkCreate(incomeData, {
    returning: true,
  });

  await Transaction.bulkCreate(transactionData, {
    returning: true,
  });

  console.log('Database seeded successfully');
  process.exit(0);
};

seedDatabase();

