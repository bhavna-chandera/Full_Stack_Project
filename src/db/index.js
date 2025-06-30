import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`\n MongoDB connected !! DB Host:
        ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection error:", error);
    process.exit(1);
    // process.exit is the nodejs feature to exit the process
    // 1 is the exit code for failure
  }
};
export default connectDB;
