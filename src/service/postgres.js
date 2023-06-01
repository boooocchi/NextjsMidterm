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

// Check if the table "Blog" exists
const checkTableQuery = `
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name = 'blog'
  );`;

pool.query(checkTableQuery, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const tableExists = data.rows[0].exists;
    if (!tableExists) {
      console.log("Table 'Blog' does not exist");
      seedDB();
    } else {
      console.log("Table 'Blog' exists");
    }
  }
});

// Seed the database with tables
const seedDB = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS "comment"`);
    await pool.query(`DROP TABLE IF EXISTS "blog"`);
    await pool.query(`DROP TABLE IF EXISTS "user"`);

    await pool.query(`
    CREATE TABLE "user" (
      user_id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      name VARCHAR(100) NOT NULL
    )
  `);

    await pool.query(`
      CREATE TABLE "blog" (
        blog_id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        user_id INT NOT NULL,
        article TEXT NOT NULL,
        date DATE DEFAULT CURRENT_DATE,
        image BYTEA NOT NULL,
        image_mime VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE
      )
    `);

    await pool.query(`
      CREATE TABLE "comment" (
        comment_id SERIAL PRIMARY KEY,
        blog_id INT NOT NULL,
        user_id INT NOT NULL,
        comment TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_id) REFERENCES "blog" (blog_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE
      )
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = pool;
