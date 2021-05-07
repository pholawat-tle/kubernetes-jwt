const ServerConfig = require('./ServerConfig');
const jwtConfig = require('./jwtConfig');

module.exports = { ...ServerConfig, ...jwtConfig };
