const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const PORT = 3001;
const bcrypt = require("bcrypt");
const User = require("./models/User");
const apiRouter = require("./routes/api");
const app = express();
const cors = require("cors");
const session = require("express-session");


mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/typester", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => {
    console.error(err);
  });


app.use(cors());
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(serveStatic("Develop/public"));

app.use(session({
    secret: "ourSecret",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/api", apiRouter);




// passport.use(
//   new LocalStrategy(function (email, password, done) {
//     User.findOne({ email: email }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect email." });
//       }
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (!result) {
//           return done(null, false, { message: "Incorrect password." });
//         }
//         return done(null, user);
//       });
//     });
//   })
// );

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
