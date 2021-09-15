const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=91e1b692eb66cd38256100d35ec3f45c&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather[0].description + ' It is currently ' + body.main.temp + ' degress out. This high today is ' + body.main.temp_max + ' with a low of ' + body.main.temp_min +'.')
        }
    })
}

module.exports = forecast