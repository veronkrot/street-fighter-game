const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const fightersRouter = require('./routes/fighters');
const detailsRouter = require('./routes/details');

const clientPath = path.join(__dirname, '..', 'client');


const app = express();
app.engine('html', require('ejs').renderFile);
app.set('views', clientPath);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(clientPath));
app.use('/fighters', fightersRouter);
app.use('/fighter', detailsRouter);
module.exports = app;
