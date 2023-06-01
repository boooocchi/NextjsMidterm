const db = require("../service/postgres");

module.exports = class User {
  constructor(email, password, name) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  save() {
    const query = {
      name: "insert-user",
      text: 'INSERT INTO "user" (email,password,name) VALUES ($1, $2, $3)',
      values: [this.email, this.password, this.name]
    };
    return db.query(query);
  }

  static findByEmailAndPassword(email, password) {
    const sql = 'SELECT * FROM "user" WHERE email = $1 AND password = $2';
    return db.query(sql, [email, password]);
  }

  // static updateOne(data) {
  //   console.log(data);
  //   let sql =
  //     "UPDATE blog SET title = $1, author = $2, article = $3, date = $4";
  //   const params = [data.title, data.author, data.article, data.date];

  //   if (data.image) {
  //     sql += ", image = $5, image_mime = $6";
  //     params.push(data.image, data.mimetype);
  //     sql += " WHERE blog_id = $7";
  //     params.push(data.id);
  //   } else {
  //     sql += " WHERE blog_id = $5";
  //     params.push(data.id);
  //   }

  //   return db.query(sql, params);
  // }

  // static deleteOne(id) {
  //   const sql = "DELETE FROM Blog WHERE blog_id = $1";
  //   return db.query(sql, [id]);
  // }
};
