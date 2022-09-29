const cors = require('cors');

const allowedCors = cors({
  origin: [
    'http://legend.students.nomoredomains.sbs',
    'https://legend.students.nomoredomains.sbs',
    'http://api.legend.students.nomoredomains.sbs',
    'https://api.legend.students.nomoredomains.sbs',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
});
module.exports = { allowedCors };
