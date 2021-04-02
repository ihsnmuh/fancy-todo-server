const { User } = require("../models");
const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");

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
            console.log(token, "<<<<<<<<<<<<<<<<<<<<<<<<<<<");
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

  static googleLogin(req, res, next) {
    const id_token = req.body.id_token;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let email = null;
    let tempUsername = null;

    client
      .verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((tiket) => {
        const payload = tiket.getPayload();
        console.log(payload);
        email = payload.email;
        tempUsername = email.split("@");

        return User.findOne({
          where: {
            email: payload.email,
          },
        });
      })
      .then((User) => {
        if (User) {
          //kalau sudah terdaftar
          return User;
        } else {
          //kalau belum terdaftar
          return User.create({
            email: email,
            username: tempUsername[0],
            password: "passwordGoogle",
          });
        }
      })
      .then((User) => {
        console.log(User, "<<<<<<<<<<<<<<<<<<<<<<<<<<");
        const token = generateToken({
          id: User.id,
          username: User.username,
          email: User.email,
        });
        console.log(token, "<<<<<<<<<<<<<<<<<<<<<<<<<<");
        res.status(200).json({
          id: User.id,
          username: User.username,
          email: User.email,
          access_token: token,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = { UserController };
