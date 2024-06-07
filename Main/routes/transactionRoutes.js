// /routes/transactionRoutes.js
const router = require('express').Router();
const transactionController = require('../controllers/transactionController');

router.use('/', transactionController);

module.exports = router;
