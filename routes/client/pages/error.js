var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.status(404);
	res.render('pages/client/error', {
		layout: 'error',
		title: '404 not found'
	});
});

module.exports = router;
