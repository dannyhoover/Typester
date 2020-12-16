const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: {type: String, minlength: 1},
    wordpermin: {type: Number, validator: (num) => num > 0},
    duration: {type: Number, validator: (num) => num > 0},
});


module.exports = mongoose.model("User", userSchema);
