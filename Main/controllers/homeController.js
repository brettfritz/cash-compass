const { Transaction, User, Income } = require('../models'); // Ensure this path is correct
const router = require('express').Router();
const withAuth = require('../utils/auth');

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

// GET routes with specific parameters to filter and retrieve the desired information
router.get('/monthly-spending', async (req, res) => {
    try {
        const monthlySpending = await Transaction.findAll({
          where: { id: req.params.id }
        });
        res.status(200).json(monthlySpending);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/monthly-income', async (req, res) => {
  try {
      const monthlyIncome = await Income.findAll({
        where: { id: req.params.id }
      });
      res.status(200).json(monthlyIncome);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login'); // Make sure this matches the login.handlebars file
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
      });

      const user = userData.get({ plain: true });

      res.render('profile', {
          user,
          logged_in: true
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;

