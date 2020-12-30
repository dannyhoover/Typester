const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  userID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  wpm: Number,
  mistakes: Number,
  accuracy: Number,
});

const Stats = mongoose.model("Stats", StatsSchema);
module.exports = Stats;
