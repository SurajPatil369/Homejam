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

//external middlewares
app.use(bodyParser.json()); //    application/json parser

//all routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/class", classRoute);
app.use(errorHandler);

app.listen(process.env.PORT, console.log("server started listening"));
