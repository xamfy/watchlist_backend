const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  //metadata: {},
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
