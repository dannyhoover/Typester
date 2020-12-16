const mongoose = require("mongoose");
const fs = require("fs");
const readline = require("readline");
const stream = require("stream");
const Excerpt = require("../models/Excerpts");

const instream = fs.createReadStream(
  "D:/Code/bootcamp-homework/Typester/src/seeders/christmas carol book.txt"
);
const outstream = new stream();

const minWordLength = 50;

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
let paragraphLineCount = 0
let minParagraphLineCount = 12

rl.on('line', function (line) {
    textBlob += line;
    paragraphLineCount++;

    if (line.length === 0 && paragraphLineCount > minParagraphLineCount) {
        Excerpt.create({
            excerpt: textBlob,
            wordLen: textBlob.split(" ").length,
            len: textBlob.length
        });
        textBlob = "";
        paragraphLineCount = 0;
    }
});

rl.on('close', function () {
    console.log("Done!");

});
