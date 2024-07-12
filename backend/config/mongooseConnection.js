import mongoose from "mongoose";
import "../../env.js";

const URL = process.env.DB_URL;

const connectingToMongoose = async () => {
  try {
    await mongoose.connect(URL);
    console.log("!!!...Successfully Connected to database...!!!");
  } catch (error) {
    console.log(error);
    throw new Error("Error in connecting to DB");
  }
};

export default connectingToMongoose;
