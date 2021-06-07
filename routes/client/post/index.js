const express = require('express');
const router = express.Router();
const Post = require('@models/Post');

/* GET home page. */
router.get('/', async function (req, res, next) {
	const posts = await Post.find().lean().limit(5);
	/* render to view engine */
	res.render('index', {
		posts: posts,
		title: 'Posts',
		subheading: 'All latest news'
	});
});

router.get('/:slug', async function (req, res, next) {
	// const posts = await Post.find().lean().limit(5);
	// /* render to view engine */
	// res.render('index', {
	// 	posts: posts,
	// 	title: 'Posts',
	// 	subheading: 'All latest news'
	// });
});

module.exports = router;
