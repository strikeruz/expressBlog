const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
	title: String,
	slug: String,
	date: String,
	content: String
});
module.exports = mongoose.model('Post', schema);
