require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes');
const { MongoLink, PORT } = require('./utils/constants');
const limiterConfig = require('./utils/limiterConfig');
const errorsHandler = require('./modules/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const limiter = rateLimit(limiterConfig);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3001',
      'http://meniaylo.nomoredomains.sbs',
      'https://meniaylo.nomoredomains.sbs',
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

mongoose.set('strictQuery', false);

mongoose.connect(MongoLink);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
