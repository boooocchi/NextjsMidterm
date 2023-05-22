// const db = require("../service/sqlite");
// const db = require("../service/mysql")
const db = require("../service/postgres");

module.exports = class Blog {
  constructor(title, author, article, date, image) {
    this.title = title;
    this.author = author;
    this.article = article;
    this.date = date;
    this.image = image;
  }

  save() {
    const query = {
      name: "insert-blog",
      text: "INSERT INTO Blog (title, author, article,date,image) VALUES ($1, $2, $3)",
      values: [this.title, this.author, this.article, this.date, thisiamge]
    };
    return db.query(query);
  }

  static find() {
    const sql = "SELECT * FROM Blog ORDER BY blog_id DESC";
    return db.query(sql);
  }

  static findById(id) {
    const sql = "SELECT * FROM Blog WHERE blog_id = $1";
    return db.query(sql, [id]);
  }

  static updateOne(data) {
    const sql =
      "UPDATE Blogs SET title = $1, author = $2, article = $3 , date=$4, image=$5 WHERE (blog_id = $6)";
    const params = [
      data.title,
      data.author,
      data.article,
      data.date,
      data.image
    ];
    return db.query(sql, params);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM Blog WHERE blog_id = $1";
    return db.query(sql, [id]);
  }
};
