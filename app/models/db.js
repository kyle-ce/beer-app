const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");
//create connection
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});
//open the mysql connection 
connection.connect(error=> {
    if (error) throw error;
    console.log("Successfully connect to database.");
});
module.exports = connection;