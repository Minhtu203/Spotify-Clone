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

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // lưu tạm file trên server
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post(
  "/",
  upload.fields([
    { name: "audioUrl", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  createSong
);
router.get("/", getAllSongs);

//get song by songId
router.get("/:songId", getSong);

//get all songs by artistId
router.get("/artist/:id", getAllSongById);

// router.post("/", createSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;
