import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const DBURL = "mongodb://0.0.0.0:27017";

mongoose
  .connect(DBURL, {})
  .then(() => {
    console.log("connection Success");
  })
  .catch((err) => {
    console.log(err);
    console.log("connection Failed");
  });
