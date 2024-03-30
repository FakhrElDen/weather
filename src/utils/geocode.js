const request = require("request"); // Import request library

/**
 * Function to geocode an address using Mapbox API.
 *
 * @param {string} address - The address to geocode.
 * @param {function} callback - The function to call with the results.
 *
 * This function uses the Mapbox Geocoding API to get the latitude, longitude,
 * and location name for a given address. It takes two arguments:
 *   - address: The address to geocode as a string.
 *   - callback: A function to be called with the results or any error.
 *
 * The callback function takes two arguments:
 *   - error: An error message if there's a problem, otherwise undefined.
 *   - data: An object containing the geocoded data if successful. The data object
 *           has the following properties:
 *             - latitude: The latitude of the location.
 *             - longitude: The longitude of the location.
 *             - location: The full location name.
 */
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWZha2hyZWxkaW4iLCJhIjoiY2t0azFqeXF1MWhzYjJ1bnU1dDgxMXN1ZyJ9.VLJ_q1GDnQLYqpnClKrfrA";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode; // Export the geocode function
