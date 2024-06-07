// /routes/index.js
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');
const incomeRoutes = require('./incomeRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);
router.use('/income', incomeRoutes);

module.exports = router;
