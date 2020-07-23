const pgp = require("pg-promise")();
const connString = "postgresql://raffdevs:yma2578k@localhost:5432/whats_forip";


const db = pgp(connString);

module.exports = db;
