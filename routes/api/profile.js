const express = require('express');
const { check, validationResult } = require('express-validator/check');
const request = require('request');
const config = require('config');

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const router = express.Router();

// @route  GET api/profile/
// @desc   get All Profiles
// @access Public / All can have access

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate('user', [
      'name',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/me
// @desc   get Logged Users Profile
// @access Private / Only that user can have access
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    // console.log(`this is from profile/me route ${req.user.id}`);
    if (!profile)
      return res.status(400).json({ msg: 'There is No Profile for This user' });

    res.json(profile);
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route  post api/profile/
// @desc   Create or Update Users Profile
// @access Private / Only that user can have access

// here we need two middlewares so using []
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // console.log(skills, profileFields.skills);

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create Profile
      profile = new Profile(profileFields);

      await profile.save();

      // console.log(profile);

      res.json(profile);
    } catch (err) {
      // console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  GET api/profile/user/:user_id
// @desc   get profile by user id
// @access Public / All can have access

router.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    // console.log(user_id);
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });

    res.json(profile);
  } catch (err) {
    // console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.status(500).send('Server Error');
  }
});

// @route  Delete api/profile/
// @desc   Delete profile, User & Posts
// @access Private / only logged user can have access

router.delete('/', auth, async (req, res) => {
  try {
    // adding functionaliry to also delete posts associated with profile
    await Post.deleteMany({ user: req.user.id });
    //  Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //  Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User Deleted' });
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/profile/experience
// @desc   add profile experience
// @access Private / only logged user can have access

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // first error handling
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      // console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  Delete api/profile/experience/:exp_id
// @desc   delete experience from profile
// @access Private / only logged user can have access

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get index of experience to remove that
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/profile/education
// @desc   add profile education
// @access Private / only logged user can have access

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // first error handling
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      // console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route  Delete api/profile/education/:edu_id
// @desc   delete education from profile
// @access Private / only logged user can have access

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get index of education to remove that
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/github/:username
// @desc   get user repos from github
// @access Public / anyone can view github repos

router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page-5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    // console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
