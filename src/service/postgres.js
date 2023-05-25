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

const sql = `SELECT to_regclass('Blog')`;
pool.query(sql, (err, data) => {
  if (err) {
    console.log(err);
  }

  if (data?.length === 0) {
    console.log(`Table 'Blog' does not exist`);
    seedDB();
  } else {
    console.log(`Table 'Blog' exists`);
  }
});

const seedDB = async () => {
  await pool.query(`DROP TABLE IF EXISTS Blog`);

  await pool.query(
    `CREATE TABLE Blog (
          Blog_ID SERIAL PRIMARY KEY,
          Title VARCHAR(100) NOT NULL,
          Author VARCHAR(100) NOT NULL,
          Article TEXT NOT NULL,
          Date DATE DEFAULT CURRENT_DATE,
          Image TEXT NOT NULL
        )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successful creation of the 'Blog' table");
    }
  );
};

module.exports = pool;
