const mongoose = require("mongoose");


const ExcerptSchema = new mongoose.Schema({
    excerpt: String,
    wordLen: Number,
    len: Number
});

const Excerpt = mongoose.model("Excerpt", ExcerptSchema);
module.exports = Excerpt;