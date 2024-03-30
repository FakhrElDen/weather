const request = require("request"); // Import request library

/**
 * Function to get weather forecast for a given location.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {function} callback - The function to call with the results.
 *
 * This function uses the OpenWeatherMap API to get the current weather
 * description, temperature, and high/low for a given latitude and longitude.
 * It takes three arguments:
 *   - latitude: The latitude of the location as a number.
 *   - longitude: The longitude of the location as a number.
 *   - callback: A function to be called with the results or any error.
 *
 * The callback function takes two arguments:
 *   - error: An error message if there's a problem, otherwise undefined.
 *   - forecast: A string containing the weather description, current
 *             temperature, high, and low for the day (if successful).
 */
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=91e1b692eb66cd38256100d35ec3f45c&units=metric";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const weatherDescription = body.weather[0].description;
      const currentTemp = body.main.temp;
      const highTemp = body.main.temp_max;
      const lowTemp = body.main.temp_min;

      // Format the forecast string
      const forecast = `${weatherDescription} It is currently ${currentTemp} degrees out. This high today is ${highTemp} with a low of ${lowTemp}.`;
      callback(undefined, forecast);
    }
  });
};

module.exports = forecast; // Export the forecast function
