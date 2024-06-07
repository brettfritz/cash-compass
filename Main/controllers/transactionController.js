// /controllers/transactionController.js
const router = require('express').Router();
const { Transaction } = require('../models');

router.post('/', async (req, res) => {
  try {
    const newTransaction = await Transaction.create({
      ...req.body,
      userId: req.session.userId
    });

    res.status(200).json(newTransaction);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transactionData = await Transaction.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    });

    if (!transactionData) {
      res.status(404).json({ message: 'No transaction found with this id!' });
      return;
    }

    res.status(200).json(transactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
