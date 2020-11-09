const mongoose = require("mongoose");

const uri = process.env.DB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err.message));

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose connected to db.");
});

connection.on("error", (err) => {
  console.log(err.message);
});

connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected.");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
