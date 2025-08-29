const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/usersRoute");
const preferencesRoute = require("./routes/preferencesRoute");
const newsRoute = require("./routes/newsRoute");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use("/users", userRouter);
app.use("/user/preferences", preferencesRoute);
app.use("/news", newsRoute);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
