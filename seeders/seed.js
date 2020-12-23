let mongoose = require("mongoose");
let db = require("../models");

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

let excerpts = [
  { title: "123", text: "text" },
  { title: "456", text: "words" },
];

db.Excerpt.deleteMany({})
  .then(() => db.Excerpt.insertMany(excerpts))
  .then((data) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
