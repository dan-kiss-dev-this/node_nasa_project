const assert = require('node:assert')
const { parse } = require('csv-parse');
// import { parse } from 'csv-parse';
// import assert from "node:asset"
const fs = require('fs')

// note in the stream example the csv data is sent through the write function and the resulting data is obtained within the readable event by calling the read function

const records = [];
// initialize the parser
const parser = parse({
    delimiter: ",",
});

//use the readable stream api to consume the records, this is using an event emitter
parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
        console.log(18, record)
        records.push(record);
    }
})

parser.on('error', function (err) {
    console.error(err.message);
})

parser.on('end', function () {
    assert.deepStrictEqual(records, [
        ['root', 'x'], ['admin', '1']
    ])
});

parser.write("root,x\nadmin,1")

parser.end()


