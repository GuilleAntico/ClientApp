"use strict";
console.log('Importing Models');

var connection = require('../../config/sequelize');
var fs = require('fs');
var path = require('path');
var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = connection.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = connection;
db.Sequelize = connection;

module.exports = db;