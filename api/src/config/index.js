const ServerConfig = require('./ServerConfig');
const jwtConfig = require('./jwtConfig');
const DatabaseConfig = require('./DatabaseConfig');

module.exports = { ...ServerConfig, ...jwtConfig, ...DatabaseConfig };
