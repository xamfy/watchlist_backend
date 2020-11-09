const router = require("express").Router();
const watchlist = require("../models/watchlist");

router.route("/").get((req, res) => {
  Detail.find()
    .then((Detail) => res.json(Detail))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const description = req.body.description;

  const detail = new Detail({
    title,
    genre,
    description,
  });
  detail
    .save()
    .then(() => res.json("Movie added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
