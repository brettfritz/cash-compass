const express = require('express');
const { Transaction, User, Vendor, Category } = require('../models');
const router = express.Router();
const withAuth = require('../utils/auth');

// Route to fetch and render transactions
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
            include: [{ model: Category, attributes: ['name'] }],
            order: [['date', 'DESC']],
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

// Route to render the add transaction form
router.get('/add', withAuth, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('addTransaction', {
            categories: categories.map(category => category.get({ plain: true })),
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error('Error fetching categories or vendors:', err);
        res.status(500).json(err);
    }
});

// Route to handle adding a transaction
router.post('/add', withAuth, async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request payload

        const { date, cost, description, categoryId, vendor } = req.body;

        // Validate the input data
        if (!date || !cost || !categoryId || !vendor) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Create a new transaction
        const newTransaction = await Transaction.create({
            userId: req.session.userId,
            date,
            cost,
            description,
            categoryId,
            vendor,
        });

        res.status(201).json(newTransaction);
    } catch (err) {
        console.error('Error creating transaction:', err);
        res.status(500).json(err);
    }
});

//Route to render the update transaction form
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const categories = await Category.findAll();
        res.render('updateTransaction', {
            categories: categories.map(category => category.get({ plain: true })),
            transaction: transaction.toJSON(),
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error('Error fetching transaction or categories:', err);
        res.status(500).json(err);
    }
});

// PUT route for updating transaction details
router.put('/:id', withAuth, async (req, res) => {
    try {
        const { date, cost, description, categoryId, vendor } = req.body;

        // Validate the input data
        if (!date || !cost || !description || !categoryId || !vendor) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const updatedTransaction = await Transaction.update(
            { date, cost, description, categoryId, vendor },
            { where: { id: req.params.id } }
        );

        res.status(200).json(updatedTransaction);
    } catch (err) {
        console.error('Error updating transaction:', err);
        res.status(400).json(err);
    }
});


// DELETE route for deleting a transaction
router.delete('/:id', withAuth, async (req, res) => {
    try {
        await Transaction.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (err) {
        console.error('Error deleting transaction:', err);
        res.status(400).json(err);
    }
});

// Endpoint to fetch transaction data for Chart.js
router.get('/data', withAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            throw new Error('User ID is not set in the session.');
        }

        const transactionData = await Transaction.findAll({
            where: { userId: userId },
            include: [
                { model: Category, attributes: ['name'] }
            ]
        });

        const transactions = transactionData.map(transaction => transaction.toJSON());

        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transaction data:', err);
        res.status(500).json(err);
    }
});

module.exports = router;

