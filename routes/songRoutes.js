import express from "express";
import {
  getSongs,
  createSong,
  getSong,
  incrementPlay,
} from "../controllers/songController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getSongs);
router.post("/", protect, createSong);

export default router;
