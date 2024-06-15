const router = require('express').Router();
const { User } = require('../models'); // Ensure this path is correct
const bcrypt = require('bcrypt');


// Signup route
router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const newUser = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      income: req.body.income,
      email: req.body.email,
      password: req.body.password,
    });

    console.log('New user created:', newUser);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

//login route
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
        logged_in: true
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Profile update route
router.put('/profile', async (req, res) => {
  try {
      const updatedData = {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          income: req.body.income,
      };

      if (req.body.password) {
          updatedData.password = await bcrypt.hash(req.body.password, 10);
      }

      const user = await User.update(updatedData, {
          where: {
              id: req.session.user_id,
          },
      });

      res.status(200).json(user);
  } catch (err) {
      res.status(500).json(err);
  }
});


// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
