const express = require("express");
const app = express();
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./db/connection");
const bodyParser = require("body-parser");

//load env vars
dotenv.config({ path: "./config/config.env" });

//database connection
connectDB();
const userRoute = require("./routes/user");
const classRoute = require("./routes/class");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
//external middlewares
app.use(bodyParser.json()); //    application/json parser
app.use(express.static(path.join(__dirname, "public"))); //to serve the files statically

//compressing response data
app.use(compression());
//sanitize input request the data
app.use(mongoSanitize());
//adding security headers
app.use(helmet());
//to avoid xss attack
app.use(xss());

//limiting the rate at which user hit the api
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

//remove http parameter pollution
app.use(hpp());

//all routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/class", classRoute);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, console.log("server started listening"));
