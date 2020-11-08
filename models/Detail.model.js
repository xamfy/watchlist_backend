const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  //metadata: {},
  
});


const Detail = mongoose.model('Detail', userSchema);

module.exports = Detail;