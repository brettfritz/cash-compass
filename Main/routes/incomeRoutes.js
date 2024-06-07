// /routes/incomeRoutes.js
const router = require('express').Router();
const incomeController = require('../controllers/incomeController');

router.use('/', incomeController);

module.exports = router;
