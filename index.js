const { parse } = require('csv-parse');
const fs = require('fs')

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    // pipe() connects readable stream to writeable stream, parse() is destination of pipe.
    .pipe(parse({
        comment: '#',
        // used to return each row in the csv as a javascript object with key value pairs instead of just as an array
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data)
        }
    })
    .on('error', (err) => console.log(err))
    .on('end', () => {
        console.log(habitablePlanets.length + " habitable planets found")
    })




