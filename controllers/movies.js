const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const DataError = require('../errors/data-err');
const ForbiddenError = require('../errors/forbidden-err');

const getSavedMovies = (_req, res, next) => {
  Movie.find().sort({ _id: -1 })
    .then((data) => res.send(data))
    .catch((err) => next(err))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .orFail(() => new NotFoundError('Фильм c указанным _id не найден'))
    .then((movie) => {
      if (String(movie.owner) === req.user._id) {
        return movie.remove()
          .then(() => res.send({ message: 'Фильм удален' }))
          .catch(next);
      }
      throw new ForbiddenError('Не ты порождал - не тебе и убивать!');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Введите корректные данные'));
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  console.log(req.user._id);
  const {
    nameEN,
    nameRU,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    nameEN,
    nameRU,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Введите корректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
