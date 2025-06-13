const { parse } = require('csv-parse');
const fs = require('fs')

const results = [];

fs.createReadStream('kepler_data.csv')
    // pipe() connects readable stream to writeable stream, parse() is destination of pipe.
    .pipe(parse({
        comment: '#',
        // used to return each row in the csv as a javascript object with key value pairs instead of just as an array
        columns: true,
    }))
    .on('data', (data) => {
        results.push(data)
    })
    .on('error', (err) => console.log(err))
    .on('end', () => {
        console.log(results)
    })




