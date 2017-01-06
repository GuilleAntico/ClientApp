
var configPath = process.env.CONFIG_PATH || process.cwd();
var config = require(configPath + '/config/config_' + process.env.NODE_ENV);

module.exports = config;