const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here


router.route("/:movie_id([0-9]+)").get(controller.read).all(methodNotAllowed)
router.route("/:movie_id/reviews").get(controller.getMovieReviews).all(methodNotAllowed)
router.route("/:movie_id/theaters").get(controller.getTheaters).all(methodNotAllowed)
router.route("/").get(controller.list).all(methodNotAllowed)

module.exports = router;
