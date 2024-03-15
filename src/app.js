const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./configuration");


const app = express();
const port = 80;
const connectionurl = config.cloudConnectString;


app.listen(port, () => {
    mongoose.connect(
      connectionurl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Database connected successfully");
        }
      }
    );
  });