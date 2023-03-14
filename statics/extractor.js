const mysql = require("mysql2");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.query("SELECT email, password FROM Users", (err, results) => {
  const data = results.reduce(
    (acc, cur) => `${acc}${cur.email},${cur.password}\n`,
    ""
  );
  fs.writeFile(`${__dirname}/output/login-targets.csv`, data, (err) => {
    connection.end();
    if (err) throw err;
  });
});
