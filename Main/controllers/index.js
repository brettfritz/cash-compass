// /routes/index.js
const router = require('express').Router();
const homeRoutes = require('./homeController');
const userRoutes = require('./userController');
const transactionRoutes = require('./transactionController');
const dashboardRoutes = require('./dashboardController');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;