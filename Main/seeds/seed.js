const sequelize = require('../config/connection');
const { User, Transaction, Category, Vendor, Session, Income } = require('../models');

const userData = require('./userData.json');
const transactionData = require('./transactionData.json');
const categoryData = require('./categoryData.json');
const vendorData = require('./vendorData.json');
const incomeData = require('./incomeData.json');
const sessionData = require('./sessionData.json');

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

  await Income.bulkCreate(incomeData, {
    returning: true,
  });

  await Transaction.bulkCreate(transactionData, {
    returning: true,
  });

  console.log('Database seeded successfully');
  process.exit(0);
};

seedDatabase();

