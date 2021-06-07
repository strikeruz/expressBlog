const express = require('express');
const router = express.Router();
const Post = require('@root/models/Post');

/* GET home page. */
router.get('/', async function (req, res, next) {
	const posts = await Post.find().lean();
	/* render to view engine */
	res.render('index', {
		posts: posts,
		title: 'Posts Title',
		subheading: 'test subheading title'
	});
});

module.exports = router;
