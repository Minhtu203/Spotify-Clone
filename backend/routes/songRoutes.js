import express from "express";
import {
  getAllSongs,
  createSong,
  getSong,
  incrementPlay,
} from "../controllers/songController.js";

const router = express.Router();

router.get("/", getAllSongs);

router.post("/", createSong);

export default router;
