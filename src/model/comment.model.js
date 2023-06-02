// const db = require("../service/sqlite");
// const db = require("../service/mysql")
const db = require("../service/postgres");

module.exports = class Comment {
  constructor(comment, commenter, blog_id, user_id) {
    this.comment = comment;
    this.commenter = commenter;
    this.blog_id = blog_id;
    this.date = new Date();
    this.user_id = user_id;
  }

  save() {
    const query = {
      name: "insert-comment",
      text: "INSERT INTO comment (blog_id,commenter,comment,date,user_id) VALUES ($1, $2, $3, $4,$5)",
      values: [
        this.blog_id,
        this.commenter,
        this.comment,
        this.date,
        this.user_id
      ]
    };
    return db.query(query);
  }

  static findById(id) {
    const sql = "SELECT * FROM comment WHERE blog_id = $1";
    return db.query(sql, [id]);
  }

  // static updateOne(data) {
  //   console.log(data);
  //   const sql =
  //     "UPDATE blog SET title = $1, author = $2, article = $3 , date=$4, image=$5 WHERE (blog_id = $6)";
  //   const params = [
  //     data.title,
  //     data.author,
  //     data.article,
  //     data.date,
  //     data.image,
  //     data.id
  //   ];
  //   return db.query(sql, params);
  // }

  static deleteOne(id) {
    const query = {
      name: "delete-comment",
      text: "DELETE FROM comment WHERE comment_id = $1",
      values: [id]
    };
    return db.query(query);
  }
};
