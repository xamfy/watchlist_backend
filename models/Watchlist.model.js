const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
  name: { type: String, required: true },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const Watchlist = mongoose.model("watchlist", watchlistSchema);

module.exports = Watchlist;
