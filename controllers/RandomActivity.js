const axios = require("axios");

class RandomController {
  static randomActivity(req, res) {
    axios({
      method: "GET",
      url: process.env.RANDOM_ACTIVITIES,
    })
      .then((response) => {
        res.status(200).json({ result: response.data.activity });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = RandomController;
