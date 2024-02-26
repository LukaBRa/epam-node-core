const fs = require("fs");
const csvToJson = require("csvtojson");
const { pipeline } = require("stream");
/* const readStream = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");
const writeSteam = fs.createWriteStream("./output.txt");

readStream.setEncoding("utf-8");

readStream
    .pipe(csvToJson())
    .pipe(writeSteam)

readStream.on("error", () => {
    console.log("Failed to read data.");
});

writeSteam.on("error", () => {
    console.log("Failed to write data.");
}) */

// Using pipeline

pipeline (
    fs.createReadStream("./csv/nodejs-hw1-ex1.csv"),
    csvToJson(),
    fs.createWriteStream("./output.txt"),
    (err) => {
        if(err){
            console.log("Failed to read/write data.");
        }
    }
)