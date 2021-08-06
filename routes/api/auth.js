const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// @route  GET api/auth
// @desc   Test route
// @access Public / anyone can have access

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // this will return the user details except password
    res.json(user);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/auth
// @desc   Authenticate User & get Token
// @access Public / so user can authenticate and can have access

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password, email } = req.body;

    try {
      // see if users exist
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'User not Found' }] });
        // .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      // matching passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
        // .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      // console.log(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
