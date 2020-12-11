const mongoose = require("mongoose");
const fs = require("fs");
const readline = require("readline");
const stream = require("stream");
const Excerpt = require("../models/Excerpts");

const instream = fs.createReadStream(
  "C:/Users/isacj/Desktop/Typster/Typester/src/seeders/christmas carol book.txt"
);
const outstream = new stream();

const minWordLength = 170;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/typester",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const rl = readline.createInterface(instream, outstream);

let textBlob = "";

rl.on("line", function (line) {
  textBlob += line;

  if (textBlob.split(" ").length > minWordLength) {
    Excerpt.create({
      excerpt: textBlob,
      wordLen: textBlob.split(" ").length,
      len: textBlob.length,
    });
    textBlob = "";
  }
});

rl.on("close", function () {
  console.log("Done!");
});
