if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");
//const logger = require("./config/logger");
const pinoHttp = require('pino-http')
const app = express();


const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// TODO: Add your code here


//use express

app.use(express.json());

//use logger

//app.use(logger);
app.use(pinoHttp());

//use cors for all routers

app.use(cors());


//List connect routes to routers

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);


// Not found handler
app.use(notFound);

//error handling
app.use(errorHandler);

module.exports = app;
