var config = require('./webpack.config');
delete config.plugins;

module.exports = config;
