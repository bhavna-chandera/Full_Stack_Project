// 5:19:50 -> video lecture of backend course part 1

// app with express through
// database connection hoga mongoose k through

// there are 2 approaches to connect to mongodb
// 1. whole setup written in index.js
// 2. separate file for database connection in db folder

//import mongoose from "mongoose";
//import { DB_NAME } from "./constants.js";
//import connectDB from "./db/index.js";

// there are 2 approaches to connect to mongodb
// 1. whole setup written in index.js
// 2. separate file for database connection in db folder

// 1st approach
// require("dotenv").config({ path: "./env" });

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import connectDB from "./db/index.js";
// connectDB();

/* 2nd approach */
/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERRR:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR:", error);
    throw err;
  }
})();
*/

// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });
connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000,() => {
    console.log(`server is running on port: ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("mongodb connection failed", err);
})
