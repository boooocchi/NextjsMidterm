// const db = require("../service/sqlite");
// const db = require("../service/mysql")
const db = require("../service/postgres");

module.exports = class Blog {
  constructor(title, author, article, date, image, mimetype) {
    this.title = title;
    this.author = author;
    this.article = article;
    this.date = date;
    this.image = image;

    this.mimetype = mimetype;
  }

  save() {
    const query = {
      name: "insert-blog",
      text: "INSERT INTO blog (title, author, article,date,image,image_mime) VALUES ($1, $2, $3, $4,$5,$6)",
      values: [
        this.title,
        this.author,
        this.article,
        this.date,
        this.image,
        this.mimetype
      ]
    };
    return db.query(query);
  }

  static find() {
    const sql = "SELECT * FROM Blog ORDER BY date DESC";

    return db.query(sql);
  }

  static findById(id) {
    const sql = "SELECT * FROM Blog WHERE blog_id = $1";
    return db.query(sql, [id]);
  }

  static updateOne(data) {
    console.log(data);
    let sql =
      "UPDATE blog SET title = $1, author = $2, article = $3, date = $4";
    const params = [data.title, data.author, data.article, data.date];

    if (data.image) {
      sql += ", image = $5, image_mime = $6";
      params.push(data.image, data.mimetype);
      sql += " WHERE blog_id = $7";
      params.push(data.id);
    } else {
      sql += " WHERE blog_id = $5";
      params.push(data.id);
    }

    return db.query(sql, params);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM Blog WHERE blog_id = $1";
    return db.query(sql, [id]);
  }
};
