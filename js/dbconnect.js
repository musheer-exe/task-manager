const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "musheer-musheer-fcbb.i.aivencloud.com",
    port: 28237,
    user: "avnadmin",
    password: process.env.DB_PASSWORD,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
});

module.exports = db;