const mongoose = require("mongoose");

const ExcerptSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const Excerpt = mongoose.model("Excerpt", ExcerptSchema);
module.exports = Excerpt;
