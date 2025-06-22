const knex = require('knex');
const path = require('path');
const config = require(path.resolve(__dirname, '../../knexfile'));

const connection = knex(config.development);

module.exports = connection;
