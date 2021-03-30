const { User } = require("../models");
const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class UserController {
  static postRegister(req, res) {
    const { username, email, password } = req.body;
    User.create({ username, email, password })
      .then((user) => {
        // console.log(user);
        res
          .status(201)
          .json({ id: user.id, username: user.username, email: user.email });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  static postLogin(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        // console.log(user);
        // pengecekan email terlebih dahulu jika salah masuk sini
        if (!user) {
          res.status(401).json({ message: "Email / Password doesn't match" });
        } else {
          // pengecekan password input dengan database
          const passwordMatch = comparePassword(password, user.password); //mengembalikan true/false ngebandingkan dengan password yang sudah dienkirpsi
          //   console.log(passwordMatch);
          if (!passwordMatch) {
            res.status(401).json({ message: "Email / Password doesn't match" });
          } else {
            //generate token JWT
            const token = generateToken({
              //bisa mengirimkan data apa saja yang dibutuhkan (default email, id)
              id: user.id,
              username: user.username,
              email: user.email,
            });
            // console.log(token);
            res.status(200).json({ access_token: token });
          }
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = { UserController };
