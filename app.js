const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
// const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'https://localhost:3000',
//       'http://localhost:3001',
//       'https://localhost:3001',
//       'http://meniaylo.nomoredomains.sbs',
//       'https://meniaylo.nomoredomains.sbs',
//     ],
//     credentials: true,
//   }),
// );

app.use(cookieParser());

app.use('/users', userRouter);
app.use('/movies', movieRouter);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
