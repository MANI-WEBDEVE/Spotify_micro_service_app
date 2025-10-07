import express from "express";
import songRouter from "./router.js";
import dotenv from "dotenv";
import redis from "redis";
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors());

export const redis_db = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) as number,
  },
});

redis_db
  .connect()
  .then(() => console.log("redis db connect"))
  .catch((error) => console.log(error));

app.use("/api/v1", songRouter);

const PORT = process.env.PORT as string;

app.listen(PORT, () => {
  console.log("server is run ", PORT);
});
