const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(serveStatic("Develop/public"));

app.use(require("./Develop/routes"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/typester", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
