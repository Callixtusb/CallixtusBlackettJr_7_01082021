const mysql = require('mysql2');
require('dotenv').config();


const conn = mysql.createConnection({  // login to DB
    host: process.env.DB_LOCALHOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'groupomania'
});

// Test connection to DB
conn.connect(
    function(err) {
        if (err) {
            console.log("!!! Cannot connect to DB!!! Error:");
            throw err;
        } else {
            console.log("Connection to Database established.");
        }
    });
module.exports = conn;