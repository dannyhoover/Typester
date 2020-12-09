let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/typester", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

let typesterSeed = [
  {
    day: new Date().setDate(new Date().getDate() - 10),
    users: [
      {
        name: "Danny",
        wordpermin: 18,
        best: 20,

      },
    ],
  },
];

db.Workout.deleteMany({})
  .then(() =>
    Promise.all(typesterSeed.map((typer) => db.Typer.create(typer)))
  )
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
