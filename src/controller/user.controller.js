const User = require("../model/user.model");
// const bcrypt = require("bcrypt");

exports.getUser = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findByEmailAndPassword(email, password)
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "failed to find user" });
    });
};

exports.registerUser = (req, res) => {
  const { enteredEmail, enteredPassword, enteredUsername } = req.body;

  const newUser = new User(enteredEmail, enteredPassword, enteredUsername);

  newUser
    .save()
    .then(() => {
      console.log("successfully create a user");
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((err) => console.error("hi how are you"));
};
