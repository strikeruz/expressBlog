const express = require('express');
const router = express.Router();
const Post = require('@models/Post');

/* GET home page. */
router.get('/posts', async function (req, res, next) {
	const posts = await Post.find().lean().limit(5);
	/* render to view engine */
	res.render('index', {
		posts: posts,
		title: 'Posts',
		subheading: 'All latest news'
	});
});

router.get('/post/:id', async function (req, res, next) {
	const { id } = req.params;
	const post = await Post.findOne({ slug: id });
	console.log(post);
	res.render('post/detail', post);
});

module.exports = router;
