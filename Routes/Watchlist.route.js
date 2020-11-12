const router = require("express").Router();
const Watchlist = require("../models/Watchlist.model");

router.route("/").get((req, res) => {
  Watchlist.find()
    .then((Watchlist) => res.json(Watchlist))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Watchlist.findById(req.params.id)
    .populate("movies")
    .then((result) => res.send(result))
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

router.route("/delete").delete((req, res) => {
  const watchlistId = req.body.watchlistId;
  const movieId = req.body.movieId;

  Watchlist.findById(watchlistId)
    .then((watchlist) => {
      // res.json(watchlist);
      if (watchlist.movies.includes(movieId)) {
        Watchlist.findByIdAndUpdate(watchlistId, { $pull: { movies: movieId } })
          .then(() =>
            res.json({
              status_code: 200,
              message: "Movie removed from watchlist",
            })
          )
          .catch((err) => res.status(400).json("Error: " + err));
      } else {
        res.json({
          status_code: 404,
          message: "Movie doesn't exist in the watchlist",
        });
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
