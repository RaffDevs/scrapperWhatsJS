const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

const app = express();

const path = require('path');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.set('view engine', 'ejs');
app.set('views', 'app/views')

consign()
    .include('app/routes')
    .into(app);
module.exports = app;