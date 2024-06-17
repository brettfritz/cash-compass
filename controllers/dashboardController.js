const router = require('express').Router();
const { User, Transaction, Income, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Transaction }, { model: Income }],
        });

        const user = userData.toJSON();

        const transactions = await Transaction.findAll({
            where: { userId: req.session.userId },
            include: [{ model: Category }],
            order: [['date', 'DESC']], // Order by date in descending order
            limit: 5 // Limit to 5 most recent transactions
        });

        const allTransactions = await Transaction.findAll({
            where: { userId: req.session.userId },
            });

        const income = await Income.findAll({
            where: { userId: req.session.userId }
        });
        const allTransactionsTotal =  Math.round((allTransactions.reduce((sum, transaction) => sum + transaction.cost, 0)) * 100) / 100;

        // Calculate total transactions and income
        const totalTransactions = Math.round((transactions.reduce((sum, transaction) => sum + transaction.cost, 0)) * 100) / 100;
        const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
        const balance = totalIncome - totalTransactions;

        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
            user,
            transactions: transactions.map(transaction => transaction.get({ plain: true })),
            income: income.map(inc => inc.get({ plain: true })),
            totalTransactions,
            totalIncome,
            balance,
            allTransactionsTotal,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
