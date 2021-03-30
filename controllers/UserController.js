const { User } = require("../models");
const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class UserController {
  static postRegister(req, res, next) {
    const { username, email, password } = req.body;
    if (username.includes(" ")) {
      res
        .status(400)
        .json({ message: "Invalid username (must be alphanumeric)" });
    } else {
      User.create({ username, email, password })
        .then((user) => {
          // console.log(user);
          res
            .status(201)
            .json({ id: user.id, username: user.username, email: user.email });
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static postLogin(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        // console.log(user);
        // pengecekan email terlebih dahulu jika salah masuk sini
        if (!user) {
          throw { name: "InvalidUserorPassword" };
        } else {
          // pengecekan password input dengan database
          const passwordMatch = comparePassword(password, user.password); //mengembalikan true/false ngebandingkan dengan password yang sudah dienkirpsi
          //   console.log(passwordMatch);
          if (!passwordMatch) {
            throw { name: "InvalidUserorPassword" };
          } else {
            //generate token JWT
            const token = generateToken({
              //bisa mengirimkan data apa saja yang dibutuhkan (default email, id)
              id: user.id,
              username: user.username,
              email: user.email,
            });
            // console.log(token);
            res.status(200).json({
              id: user.id,
              username: user.username,
              email: user.email,
              access_token: token,
            });
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = { UserController };
