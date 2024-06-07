// /controllers/incomeController.js
const router = require('express').Router();
const { Income } = require('../models');

router.post('/', async (req, res) => {
  try {
    const newIncome = await Income.create({
      ...req.body,
      userId: req.session.userId
    });

    res.status(200).json(newIncome);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
