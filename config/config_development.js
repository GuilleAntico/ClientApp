"use strict";

var config = {
    db: {
        host: process.env.host || 'host',
        user: process.env.user || 'database-user',
        password: process.env.password || 'database-password',
        database: process.env.database || 'database-test',
        port: process.env.port || 'database-port(3306)',
        charset: 'utf8'
    },
    PORT : process.env.PORT || 'app-port(3000)'
};

module.exports = config;