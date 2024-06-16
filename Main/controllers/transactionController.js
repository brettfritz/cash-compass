const express = require('express');
const { Transaction, User, Vendor, Category } = require('../models');
const router = express.Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        console.log('Session Information:', req.session);

        const userId = req.session.userId;
        if (!userId) {
            throw new Error('User ID is not set in the session.');
        }
        
        console.log(`Fetching transactions for user ID: ${userId}`);

        const transactionData = await Transaction.findAll({
            where: { userId: userId },
            include: [
                { model: Vendor, attributes: ['name'] },
                { model: Category, attributes: ['name'] }
            ]
        });

        const transactions = transactionData.map(transaction => transaction.toJSON());
        console.log(`Fetched ${transactions.length} transactions from the database for user ID: ${userId}`);

        res.render('transaction', {
            loggedIn: req.session.loggedIn,
            transactions,
        });
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json(err);
    }
});





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

module.exports = router;
