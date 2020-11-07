const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017/movielist_api";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.get('/', (req, res) => {
    res.json({"message": "Welcome to bhaiMDB application. Select Movies quickly. Organize and keep track of your Movie List."});
});
require('./app/routes/note.routes.js')(app);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});











































