const express = require('express');
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route  POST api/posts
// @desc   create a post
// @access private , logged user can have create

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      // console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/posts
// @desc Get All posts
// @access private / only logged user can see

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    // console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route GET api/posts/:post_id
// @desc Get posts by post_id
// @access private / only logged user can see

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) return res.status(404).json({ msg: 'Post not Found' });

    res.json(post);
  } catch (err) {
    // console.log(err);

    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not Found' });

    res.status(500).send('Server Error');
  }
});

// @route DELETE api/posts/:post_id
// @desc Delete post by id
// @access private / only logged user can delete

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if post doesnt exist
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // check - user can delete his/her own post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized' });
    }

    // now remove the post
    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    // console.log(err);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not Found' });

    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/like/:id
// @desc like a post
// @access private / only logged user can like

router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if post have already been liked by this user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked.' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    // console.log(err);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not Found' });

    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/unlike/:id
// @desc unlike a post
// @access private

router.put('/unlike/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // check if post have already been liked by this user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked.' });
    }

    // get index first and then remove
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    // console.log(err);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not Found' });

    res.status(500).send('Server Error');
  }
});

// Comment Section

// @route  POST api/posts/comments/:post_id
// @desc   create a comment on post
// @access private , logged user can comment

router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      // console.log(err);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/posts/comment/:post_id/:comment_id
// @desc   delete a comment on post
// @access private , logged user can delete

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // get comment from that post
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // make sure comment exist
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    // check user so onle he/she can delete comment
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    // console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
