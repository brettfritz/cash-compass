const router = require('express').Router();
const { Transaction, User } = require('../models'); // Ensure this path is correct

router.get('/', async (req, res) => {
  try {
    const transactionsData = await Transaction.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });

    const transactions = transactionsData.map((transaction) => transaction.get({ plain: true }));

    res.render('home', { 
      transactions,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
