"use strict";
console.log('Importing Routes');

module.exports = function (Router) {
    require('./clientRoutes')(Router);
    require('./providerRoutes')(Router);
};