const mongoose = require("mongoose");

const URL =
  "mongodb+srv://TD:tdRupi%40123@cluster0.e5ng0.mongodb.net/TD?retryWrites=true&w=majority";
mongoose
  .connect(URL)
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("no connection" + e);
  });
