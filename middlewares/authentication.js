const { verify } = require("../helper/jwt");
const { User } = require("../models");

async function authenticate(req, res, next) {
  // console.log("======Authentication=====");
  // cek jwt token
  // kalo tokennya valid cek user ada atau tidak di database
  // kalo ada lanjut ke next()
  // kalo tidak ada res status(401) not authorized

  // Promise Handling
  //   const access_token = req.headers.access_token;
  //   if (access_token) {
  //     const decoded = verify(access_token);
  //     User.findOne({
  //       where: { email: decoded.email },
  //     })
  //       .then((user) => {
  //         if (user) {
  //           next();
  //         } else {
  //           res.status(401).json({ message: "Invalid Access Token" });
  //         }
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ message: err.message });
  //       });
  //   } else {
  //     res.status(401).json({ message: "Invalid Access Token" });
  //   }

  // Async Await Handling
  try {
    const access_token = req.headers.access_token;
    if (access_token) {
      const decoded = verify(access_token);
      const foundUser = await User.findOne({
        where: {
          email: decoded.email,
        },
      });
      if (foundUser) {
        req.loggedUser = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        };
        next();
      } else {
        throw { status: 401, message: "Invalid access token" };
      }
    } else {
      throw { status: 401, message: "Please login first" };
    }
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  }
}

module.exports = authenticate;
