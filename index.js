/** @format */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { DB_USER, DB_PASSWORD, ACCESS_TOKEN } = process.env;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const app = express();

app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api', routes);

// Connect to DB
const mongoose = require('mongoose');
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fnem1ld.mongodb.net/test`,
  console.log('%s connected to Db')
);

// Listen on port
app.listen(3001, () => console.log('%s listening at 3001'));
