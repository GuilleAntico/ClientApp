"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('../config/environment');
var Router = express.Router();
var path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

/* Sync Models */
require('./models').sequelize.sync();

/* Resolving Cross Origin Requests */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/* Routes */
require('./routes')(Router);

app.use('/api', Router);

app.get('/swagger', function(req, res, next){
    res.sendFile(path.resolve('public/swagger/index.html'));
});

app.get('*', function(req, res, next){
    res.sendFile(path.resolve('public/index.html'));
});

// START THE SERVER
// =============================================================================
app.listen(config.PORT);
console.log('API Running in PORT: ' + config.PORT);