import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());

const PORT = 3000;

const connec = async () => {
  await app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
};

connec();

app.use("/api/user", userRoute);
app.use("/api/auth", authRouter);
