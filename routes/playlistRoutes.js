import express from "express";
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlistController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Lấy tất cả playlist
router.get("/", getAllPlaylists);

// Lấy chi tiết playlist theo ID
router.get("/:id", getPlaylistById);

// // Tạo playlist (cần đăng nhập)
// router.post("/", protect, createPlaylist);

// // Cập nhật playlist (cần đăng nhập)
// router.put("/:id", protect, updatePlaylist);

// // Xóa playlist (cần đăng nhập)
// router.delete("/:id", protect, deletePlaylist);

// // Thêm bài hát vào playlist (cần đăng nhập)
// router.post("/:id/songs", protect, addSongToPlaylist);

// // Xóa bài hát khỏi playlist (cần đăng nhập)
// router.delete("/:id/songs/:songId", protect, removeSongFromPlaylist);

export default router;
