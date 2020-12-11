const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../src/models/User");

router.post("/user/login/", (req, res, next) => {
    User.findOne({email: req.body.email}, (user, err) => {
        if (err) console.log(err);
        bcrypt.compare(req.body.password, user.password, (result) => {
            if (result) {
                req.login(user, (err) => {
                    console.log(err);
                });
                return res.redirect("/")
            } else {
                console.log("Wrong Password!")
            }
        });
    });
});

router.post("/user/register/", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.create({
            email: req.body.email,
            password: hash
        });
    });
});

module.exports = router;