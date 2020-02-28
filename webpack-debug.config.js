var config = require('./webpack.config');
delete config.plugins;
config.mode = 'development';

module.exports = config;
