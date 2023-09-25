var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");
var cors = require("cors");
var history = require("connect-history-api-fallback");

const owner_routes = require("./routes/owner.js");
const dogsitter_routes = require("./routes/dogsitter.js");
//const playdate_routes = require("./routes/playdate.js");
const dog_routes = require("./routes/dog.js");

// Variables
var mongoURI = "mongodb://0.0.0.0:27017/woofMeDB";
//'mongodb+srv://woofMeUser:ya8XmNOw@woofmecluster.s2pgnsd.mongodb.net/?retryWrites=true&w=majority';
//process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
var port = 3000;

// Connect to MongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB!");
}
// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan("dev"));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options("*", cors());
app.use(cors());

//Using the routes
app.use("/api/owners", owner_routes);
app.use("/api/dogsitters", dogsitter_routes);
app.use("/api/dogsitters/sort", dogsitter_routes);
//app.use("/api/playdates", playdate_routes);
app.use("/api/dogs", dog_routes);

// Logging for non-existing routes
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Import routes
app.get("/api", function (req, res) {
  res.json({ message: "Welcome to your DIT342 backend ExpressJS project!" });
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not Found" });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + "/..");
var client = path.join(root, "client", "dist");
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get("env");
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err.stack);
  var err_res = {
    message: err.message,
    error: {},
  };
  if (env === "development") {
    // Return sensitive stack trace only in dev mode
    err_res["error"] = err.stack;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
