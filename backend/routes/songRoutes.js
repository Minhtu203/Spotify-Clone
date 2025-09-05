import express from "express";
import {
  getAllSongs,
  createSong,
  getSong,
  incrementPlay,
  getAllSongById,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";

const router = express.Router();

router.get("/", getAllSongs);

//get song by songId
router.get("/:songId", getSong);

//get all songs by artistId
router.get("/artist/:id", getAllSongById);

router.post("/", createSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;
