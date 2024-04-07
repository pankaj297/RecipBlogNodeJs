import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const DBURL =
  "mongodb+srv://pankajnaik958:test123@cluster2.u3axap5.mongodb.net/test";

mongoose
  .connect(DBURL, {})
  .then(() => {
    console.log("connection Success");
  })
  .catch((err) => {
    console.log(err);
    console.log("connection Failed");
  });
