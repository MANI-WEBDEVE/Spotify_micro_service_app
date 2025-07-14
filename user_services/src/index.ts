import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router.js";

dotenv.config();  
 
const connectDB = async () => {
  console.log(process.env.MONGODB_URI); 
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "spotify_microservice"
    });
    console.log("Connected to MongoDB"); 
  } catch (error) {
    console.log(error);
    process.exit(1);   
  }
} 
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000;

app.use("/api/v1", router)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});