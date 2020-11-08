const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    Title: String,
    Genre: String
}

module.exports = mongoose.model('Note', NoteSchema);
