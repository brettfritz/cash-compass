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
            include: [{ model: Category }]
        });
        const income = await Income.findAll({
            where: { userId: req.session.userId }
        });

        // Calculate total transactions and income
        const totalTransactions = transactions.reduce((sum, transaction) => sum + transaction.cost, 0);
        const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
        const balance = totalIncome - totalTransactions;

        // Categorize transactions
        // const categorizedTransactions = {};
        // transactions.forEach(transaction => {
        //     const category = transaction.category.name;
        //     if (!categorizedTransactions[category]) {
        //         categorizedTransactions[category] = 0;
        //     }
        //     categorizedTransactions[category] += transaction.cost;
        // });
        res.render('dashboard', {
            loggedIn: req.session.loggedIn,
            user,  // assuming you store user data in session
            // vendor: vendor.name,
            // category: category.name,
            transactions: transactions.map(transaction => transaction.get({ plain: true })),
            income: income.map(inc => inc.get({ plain: true })),
            totalTransactions,
            totalIncome,
            balance,
            // categorizedTransactions,
          });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
