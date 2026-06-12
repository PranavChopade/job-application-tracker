import mongoose from "mongoose";
import ENV from "../config/ENV.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to db");
    })
    mongoose.connection.on("disconnected", () => {
      console.log("disconnected from db");
    })
    mongoose.connection.on("error", (error) => {
      console.log("error in db connection", error);
    })
    mongoose.connect(ENV.MONGO_URI, {
      dbName: ENV.DB_NAME,
    });
  } catch (error) {
    console.log("error in db connection", error);
  }
}

export default connectDB;