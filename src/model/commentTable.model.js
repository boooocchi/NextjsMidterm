// const db = require("../service/sqlite");
// const db = require("../service/mysql")
const db = require("../service/postgres");

module.exports = class Comment {
  constructor(comment_id, blog_id, commenter, comment, date) {
    this.blog_id = blog_id;
    this.commenter = commenter;
    this.comment = comment;
    this.date = date;
  }

  save() {
    const query = {
      name: "insert-comment",
      text: "INSERT INTO comment (blog_id,commenter,comment,date) VALUES ($1, $2, $3, $4)",
      values: [this.blog_id, this.commenter, this.comment, this.date]
    };
    return db.query(query);
  }

  static find() {
    const sql = "SELECT * FROM comment ORDER BY blog_id DESC";

    return db.query(sql);
  }

  static updateOne(data) {
    console.log(data);
    const sql =
      "UPDATE blog SET title = $1, author = $2, article = $3 , date=$4, image=$5 WHERE (blog_id = $6)";
    const params = [
      data.title,
      data.author,
      data.article,
      data.date,
      data.image,
      data.id
    ];
    return db.query(sql, params);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM Blog WHERE blog_id = $1";
    return db.query(sql, [id]);
  }
};
