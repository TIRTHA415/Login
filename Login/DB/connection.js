const mongoose = require("mongoose");

const URL = process.env.DB_CONNECTION_STRING;
mongoose
  .connect(URL)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("no connection" + e);
  });
