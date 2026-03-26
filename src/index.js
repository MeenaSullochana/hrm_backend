require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port is " + process.env.PORT);
    });
  })
  .catch(err => console.log(err));