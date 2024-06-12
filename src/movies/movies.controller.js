const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const mapProperties = require("../utils/map-properties");


//adds the critic field
const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movie_id);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({status: 404, message: 'Movie cannot be found'})
}

async function read(req, res) {
  const data  = res.locals.movie;

  req.log.warn({ __filename, data})

  res.json({ data });
}


async function list(req, res) {
  const is_showing =  req.query.is_showing;
  
  const data = await service.list(is_showing);

  res.json({
    data,
  });
  
}

async function getMovieReviews(req, res, next) {

  const rawData = await service.getMovieReviews(req.params.movie_id);

  const data = rawData.map(addCritic);

  res.json({
    data,
  });
}


async function getTheaters(req, res, next){
  const data = await service.getTheaters(req.params.movie_id);

  res.json({
    data,
  });
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  getMovieReviews: [asyncErrorBoundary(movieExists), getMovieReviews],
  getTheaters: [asyncErrorBoundary(movieExists), getTheaters],
};
