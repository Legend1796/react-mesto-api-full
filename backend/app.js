require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'http://legend.students.nomoredomains.sbs',
  'https://legend.students.nomoredomains.sbs',
  'http://api.legend.students.nomoredomains.sbs',
  'https://api.legend.students.nomoredomains.sbs',
  'http://api.legend.students.nomoredomains',
  'https://api.legend.students.nomoredomains',
  'http://api.legend.students.nomoredomains.sbs/',
  'https://api.legend.students.nomoredomains.sbs/',
];

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// app.use(cors({
//   origin: [
//     'http://legend.students.nomoredomains.sbs',
//     'https://legend.students.nomoredomains.sbs',
//     'http://localhost:3001',
//     'http://localhost:3000',
//     'https://localhost:3001',
//     'http://localhost:3001',
//   ],
//   credentials: true,
// }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }
  next();
});

app.use(router);
app.use(errorLogger);
app.use(errorHandler);
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
