const { User } = require('../models'); // Ensure this path is correct
const router = require('express').Router();
const withAuth = require('../utils/auth');

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

