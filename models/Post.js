const mongoose = require("mongoose")
const schema = mongoose.Schema({
    title: String,
    slug: String,
    date: String,
    content: String
})
module.exports = mongoose.model('Post', schema)