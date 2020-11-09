const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const watchlist = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  //metadata: {},
});

const list = mongoose.model("list", watchlist);

module.exports = list;
