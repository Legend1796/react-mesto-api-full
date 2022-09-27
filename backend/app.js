require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

// const allowedCors = [
//   'http://legend.students.nomoredomains.sbs',
//   'https://legend.students.nomoredomains.sbs',
//   'https://legend.students.nomoredomains.sbs',
//   'http://api.legend.students.nomoredomains.sbs',
//   'https://api.legend.students.nomoredomains.sbs',
//   'http://localhost:3000',
//   'http://localhost:3001',
// ];
// app.use((req, res, next) => {
//   console.log(req.headers);
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   return next();
// });
app.use(cors({
  origin: [
    'http://legend.students.nomoredomains.sbs',
    'https://legend.students.nomoredomains.sbs',
    'http://api.legend.students.nomoredomains.sbs',
    'https://api.legend.students.nomoredomains.sbs',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);
