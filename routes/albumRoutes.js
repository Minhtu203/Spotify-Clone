// routes/albumRoutes.js
import express from "express";
import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controllers/albumController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Lấy toàn bộ album
router.get("/", getAllAlbums);

// Lấy chi tiết album theo ID
router.get("/:id", getAlbumById);

// Tạo album mới (yêu cầu đăng nhập)
router.post("/", protect, createAlbum);

// Cập nhật album (yêu cầu đăng nhập)
router.put("/:id", protect, updateAlbum);

// Xoá album (yêu cầu đăng nhập)
router.delete("/:id", protect, deleteAlbum);

export default router;
