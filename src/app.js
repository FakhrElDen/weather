// Import required modules
const express = require("express");
const port = process.env.PORT || 3000; // Get port from environment or use 3000
const hbs = require("hbs"); // For rendering Handlebars templates
const path = require("path"); // For path manipulation
const geocode = require("./utils/geocode"); // Util for geocoding addresses
const forecast = require("./utils/forecast"); // Util for fetching weather forecasts

// Create Express app
const app = express();

// Configure views for Handlebars
const publicDirectoryPath = path.join(__dirname, "../public"); // Path for static assets
const viewsPath = path.join(__dirname, "../templates/views"); // Path for template views
const partialsPath = path.join(__dirname, "../templates/partials"); // Path for partial views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serve static files from public directory
app.use(express.static(publicDirectoryPath));

// Routing

// Home route (root path)
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mohamed Fakhr El-Din",
  });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Mohamed Fakhr El-Din",
  });
});

// Weather route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    // Address is required, send error response
    return res.send({ error: "You must provide an address!" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        // Handle geocoding errors
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          // Handle forecast errors
          return res.send({ error });
        }

        // Send weather forecast data
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// Catch-all route for 404 errors
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohamed Fakhr El-Din",
    errorMessage: "Page not found.",
  });
});

// Start the server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
