"use strict";
var Sequelize = require('sequelize');
var config = require('./environment');


var connection = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host : config.db.host,
        dialect : 'mysql',
        port : config.db.port,
        pool : {
            max : 5,
            min : 0
        },
        dialectOptions: {
            socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
        },
        charset : config.db.charset
    });

connection.query('select now()').then(function(res){
    console.log('Database connected at: '+res[0][0]['now()']);
});

module.exports = connection;