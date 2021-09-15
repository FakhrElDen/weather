// it's npm package to be the simplest way possible to make http calls
const request = require('request')

// using call back function as second argument 
// it's a function calling once you have the data
const geocode = (address, callback) => {

    // api from Mapbox website 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWZha2hyZWxkaW4iLCJhIjoiY2t0azFqeXF1MWhzYjJ1bnU1dDgxMXN1ZyJ9.VLJ_q1GDnQLYqpnClKrfrA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// export geocode function so he can use it in another function
module.exports = geocode