import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();  
 
const connectDB = async () => {
  console.log(process.env.MONGODB_URI); 
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB"); 
  } catch (error) {
    console.log(error);
    process.exit(1);   
  }
} 
const app = express();

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});