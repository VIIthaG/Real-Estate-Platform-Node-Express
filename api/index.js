import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Datebase Connected"))
  .catch((err) => console.error(err));

const app = express();

const PORT = process.env.PORT || 3000;

const connec = async () => {
  await app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
};
