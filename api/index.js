import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

const connec = async () => {
  await app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
};

connec();

app.use("/api/user", userRoute);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, msg: message });
});
