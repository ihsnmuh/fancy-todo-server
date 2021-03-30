const axios = require("axios");

class MovieController {
  static searchMovies(req, res) {
    const TMDB_TOKEN = process.env.TMDB_TOKEN;
    // console.log(TMDB_TOKEN);
    axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    })
      .then((response) => {
        let movies = [];
        response.data.results.forEach((movie) => {
          movies.push({
            id: movie.id,
            title: movie.title,
            release_date: movie.releaseDate,
          });
        });
        res.status(200).json(movies);
      })
      .catch((err) => {
        // console.log(err);
        res.status(500).json({ message: err.message });
      });
  }
}

module.exports = MovieController;
