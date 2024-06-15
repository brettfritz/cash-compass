const express = require('express');
const { Transaction, User } = require('../models');
const router = express.Router();
const withAuth = require('../utils/auth');

// POST route for new transactions
router.post('/', withAuth, async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT route for updating transaction details
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedTransaction = await Transaction.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(updatedTransaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE route for deleting a transaction
router.delete('/:id', withAuth, async (req, res) => {
    try {
        await Transaction.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
});


//not working/untested route for getting the transactions for a user
router.get('/', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
      });
      const user = userData;
  
      res.render('transaction', {
        user,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET routes for seeing all transactions, and filtering by date, category, etc
// router.get('/', withAuth, async (req, res) => {
//     try {
//         const transactions = await Transaction.findAll();
//         res.status(200).json(transactions);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

module.exports = router;
