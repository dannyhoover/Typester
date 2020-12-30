const router = require("express").Router();
const bcrypt = require("bcrypt");

const db = require("../models");

router.post("/user/login/", (req, res, next) => {
    db.User.findOne({email: req.body.email}, (user, err) => {
        if (err) return console.log(err);
        bcrypt.compare(req.body.password, user.password, (result) => {
            if (result) {
                req.login(user, (err) => {
                    console.log(err);
                });
                return res.redirect("/");
            } else {
                console.log("Wrong Password!");
            }
        });
    });
});

router.post("/user/register/", (req, res) => {
    console.log(req.body);
    db.User.findOne({email: req.body.email}, (user, err) => {
        if (user) {
            console.log("User already exists!");
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                db.User.create({
                    email: req.body.email,
                    password: hash,
                }).then(() => {
                    const message = `Successfully Created user: ${req.body.email}`;
                    res.json(message);
                });
            });
        }
    });
});

router.get("/excerpts", (req, res) => {
    db.Excerpt.find()
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({});
        });
});

module.exports = router;
