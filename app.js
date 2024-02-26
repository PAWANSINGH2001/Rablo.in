const express = require("express");
const mongoose = require("mongoose");
const authrouters = require("./routers/authrouters");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();

app.use(express.json());
app.use(
  session({
    secret: "thiskeymustbesecret", 
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const URI = process.env.db_URI;
//function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.db_URI}`);
    console.log("Connected to database");
  } catch (err) {
    console.log("Mongoose connection error ", err);
  }
};
connectDB();

//using routes
app.use(authrouters);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
