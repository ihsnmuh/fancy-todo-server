const axios = require("axios");

class RandomController {
  static randomActivity(req, res) {
    axios({
      method: "GET",
      url: process.env.RANDOM_ACTIVITIES,
    })
      .then((response) => {
        res.status(200).json({ result: response.data });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
}

module.exports = RandomController;
