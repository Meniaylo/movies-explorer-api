const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { userValidation, authValidation } = require('../middlewares/validation');

router.post('/signin', authValidation, login);
router.post('/signup', userValidation, createUser);

router.get('/signout', (_req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из приложения, и мы уже скучаем!' });
});

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (_req, _res, next) => {
  next(new NotFoundError('Not Found'));
});

module.exports = router;
