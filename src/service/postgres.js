require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// const sql = `SELECT to_regclass('Blog')`;
const sql = `SELECT EXISTS (
  SELECT FROM
      information_schema.tables
  WHERE
      table_schema LIKE 'public' AND
      table_type LIKE 'BASE TABLE' AND
      table_name = 'blog'
  );`;
pool.query(sql, (err, data) => {
  if (err) {
    console.log(err);
  }
  if (!data.rows[0].exists) {
    console.log(`Table 'Blog' does not exist`);
    seedDB();
  } else {
    console.log(`Table 'Blog' exists`);
  }
});

const seedDB = async () => {
  await pool.query(`DROP TABLE IF EXISTS comment`);
  await pool.query(`DROP TABLE IF EXISTS Blog`);

  await pool.query(
    `CREATE TABLE Blog (
      Blog_ID SERIAL PRIMARY KEY,
      Title VARCHAR(100) NOT NULL,
      Author VARCHAR(100) NOT NULL,
      Article TEXT NOT NULL,
      Date DATE DEFAULT CURRENT_DATE,
      Image BYTEA NOT NULL,
      Image_MIME VARCHAR(100)
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the 'Blog' table");
    }
  );
  await pool.query(`DROP TABLE IF EXISTS Comment`);

  await pool.query(
    `CREATE TABLE Comment (
      Comment_ID SERIAL PRIMARY KEY,
      Blog_ID INT NOT NULL,
      Commenter VARCHAR(100) NOT NULL,
      Comment TEXT NOT NULL,
      Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (Blog_ID) REFERENCES Blog (Blog_ID) ON DELETE CASCADE
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the 'Comment' table");
    }
  );
};

module.exports = pool;
