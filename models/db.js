var loki = require('lokijs');

var db = new loki('accounts.db');

module.exports = db;