import express, { Router } from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getUser, getUserListings } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);

router.delete("/delete/:id", verifyToken, deleteListing);

router.post("/update/:id", verifyToken, updateListing);

router.get("/get/:id", getListing);

router.get("/:id", verifyToken, getUser);

export default router;
