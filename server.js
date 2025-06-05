import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const app = express();

mongoose.set('strictQuery', true);

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    console.log(`DB connected on database named ${connection.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if DB connection fails
  }
};

mongoose.connection.on('connected', () => {
  console.log("MongoDB connected");
});

mongoose.connection.on('disconnected', () => {
  console.log("MongoDB disconnected");
});

// Start the server and connect to DB
app.listen(5000, async () => {
  await connectMongoDB();
  console.log("Server is listening on port 5000");
});