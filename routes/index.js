const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.get('/signout', (_req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из приложения, и мы уже скучаем!' });
});

router.use(auth);

router.use(require('./users'));
router.use(require('./movies'));

router.use('*', (_req, _res, next) => {
  next(new NotFoundError('Not Found'));
});

module.exports = { router };
