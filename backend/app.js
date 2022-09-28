require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { cors } = require('./middlewares/cors');

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

app.use(cors({
  origin: [
    'http://legend.students.nomoredomains.sbs',
    'https://legend.students.nomoredomains.sbs',
    'http://api.legend.students.nomoredomains.sbs',
    'https://api.legend.students.nomoredomains.sbs',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);
