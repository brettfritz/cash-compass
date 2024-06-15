const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');


router.get('/:id', (req, res) => {
  res.render('profile');
})


// Route to render the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Route to render the profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });
    const user = userData;

    res.render('profile', {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// New signup route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      income: req.body.income,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.render('dashboard', {
        userData,
        loggedIn: true,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Profile update route
router.put('/profile', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });
    console.log(userData);

    const updatedData = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      income: req.body.income,
    };
    console.log(updatedData);

    if (req.body.password) {
      updatedData.password = await bcrypt.hash(req.body.password, 10);
    }

    await User.update(updatedData, {
      where: {
        id: req.session.userId,
      },
    });

    res.redirect('/profile'); // Redirect the user back to the profile page
  } catch (err) {
    res.status(500).json(err);
  }
});


// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
