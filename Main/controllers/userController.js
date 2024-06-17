const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../utils/auth');


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.userId = user.id;
            req.session.loggedIn = true;
            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = {
    loginUser,
};


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
  console.log('route hit');
  console.log('session data in route')
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });
    const user = userData.toJSON();
    console.log(user);
    res.render('profile', {
      loggedIn: req.session.loggedIn,
      user,

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
    console.log('New User:', newUser.toJSON());
    
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      console.log('Session:', req.session);

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
      req.session.user = userData.toJSON();

      console.log('session data after login (usercontroller):', req.session);

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
  console.log('update profile route');
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

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

    await User.update(updatedData, {
      where: {
        id: req.session.userId,
      },
    });

    req.session.user = {
      ...req.session.user,
      ...updatedData,
    };

    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        return res.status(500).json({ message: 'Failed to save session' });
      }

      res.status(200).json({ message: 'Profile updated successfully' });
    });

  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Failed to update profile' });
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
