const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegExp } = require('../utils/constants');

const {
  createMovie,
  getSavedMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required(),
    nameRU: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegExp),
    trailerLink: Joi.string().required().pattern(linkRegExp),
    thumbnail: Joi.string().required().pattern(linkRegExp),
    movieId: Joi.number().required(),
  }),
}), createMovie);

module.exports = router;
