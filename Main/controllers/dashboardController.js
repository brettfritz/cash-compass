const router = require('express').Router();
const { User, Transaction, Income, Category } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {

    try {
        const userData = await User.findByPk(req.session.userId, {
            attributes: { exclude: ['password'] },
            include: [{ model: Transaction }, { model: Income }],
        });

        const user = userData

        const transactions = await Transaction.findAll({
            where: { user_id: req.session.userId },
            include: [{ model: Category }]
        });
        console.log("green");
        const income = await Income.findAll({
            where: { user_id: req.session.userId }
        });

        // Calculate total transactions and income
        const totalTransactions = transactions.reduce((sum, transaction) => sum + transaction.cost, 0);
        const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
        const balance = totalIncome - totalTransactions;

        // Categorize transactions
        const categorizedTransactions = {};
        transactions.forEach(transaction => {
            const category = transaction.category.name;
            if (!categorizedTransactions[category]) {
                categorizedTransactions[category] = 0;
            }
            categorizedTransactions[category] += transaction.cost;
        });

        res.render('dashboard', {
            user,
            transactions: transactions.map(transaction => transaction.get({ plain: true })),
            income: income.map(inc => inc.get({ plain: true })),
            totalTransactions,
            totalIncome,
            balance,
            categorizedTransactions,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
