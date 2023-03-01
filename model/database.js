require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "mvp",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = `DROP TABLE if exists collabs; 
    CREATE TABLE collabs
      (collab_id INT NOT NULL AUTO_INCREMENT, 
      influencer_name VARCHAR(40) not null, 
      handle VARCHAR(40), 
      platform VARCHAR(40), 
      date DATE, 
      brief INTEGER, 
      status_collab VARCHAR(20) NOT NULL, 
      followers INTEGER, 
      price_ex_vat INTEGER, 
      ig_post BOOLEAN, 
      ig_story BOOLEAN, 
      boosted BOOLEAN, 
      comments VARCHAR(200),
      country_code VARCHAR(2) NOT NULL,
      PRIMARY KEY (collab_id));`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `collabs` was successful!");

    console.log("Closing...");
  });

  con.end();
});
