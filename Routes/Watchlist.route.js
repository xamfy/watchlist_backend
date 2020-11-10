const router = require("express").Router();
const Watchlist = require("../models/Watchlist.model");

router.route("/").get((req, res) => {
  Detail.find()
    .then((Detail) => res.json(Detail))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const name = req.body.name;
  const watchlist = new Watchlist({
    name,
  });
  watchlist
    .save({ validateBeforeSave: false })
    .then(() => res.json(watchlist))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const watchlistId = req.body.watchlistId;
  const movieId = req.body.movieId;
  console.log(movieId);

  Watchlist.findById(watchlistId)
    .then((watchlist) => {
      // res.json(watchlist);
      if (watchlist.movies.includes(movieId)) {
        res.send("already exists");
      } else {
        // res.send("doesn't exist");
        Watchlist.findByIdAndUpdate(
          watchlistId,
          { $push: { movies: movieId } },
          { new: true, useFindAndModify: false }
        )
          .then(() => res.json("Movie added to watchlist"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));

  // Watchlist.find({ movies: { $in: [movieId] } }, (err, movie) => {
  //   if (err) {
  //     // console.log(err)
  //     res.send(err);
  //   }
  //   console.log(movie);
  //   if (movie.length > 0) {
  //     res.status(400).json("Movie already exists in the watchlist");
  //     return;
  //   } else {
  //     Watchlist.findByIdAndUpdate(
  //       watchlistId,
  //       { $push: { movies: movieId } },
  //       { new: true, useFindAndModify: false }
  //     )
  //       .then(() => res.json("Movie added to watchlist"))
  //       .catch((err) => res.status(400).json("Error: " + err));
  //   }
  // });
});

module.exports = router;
