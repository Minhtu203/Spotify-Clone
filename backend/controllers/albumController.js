import Album from "../models/albumModel.js";
import Song from "../models/songModel.js";

// 1. Tạo album mới
export const createAlbum = async (req, res) => {
  try {
    const { title, artist, coverImage, songs } = req.body;

    // Kiểm tra nếu có danh sách songs thì verify ID tồn tại
    if (songs && songs.length > 0) {
      const existingSongs = await Song.find({ _id: { $in: songs } });
      if (existingSongs.length !== songs.length) {
        return res
          .status(400)
          .json({ message: "Một số bài hát không tồn tại" });
      }
    }

    const album = new Album({
      title,
      artist,
      coverImage,
      songs,
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo album", error: error.message });
  }
};

// 2. Lấy tất cả album
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("songs");
    res.json(albums);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy album", error: error.message });
  }
};

// 3. Lấy album theo ID
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("songs");
    if (!album)
      return res.status(404).json({ message: "Không tìm thấy album" });
    res.json(album);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy album", error: error.message });
  }
};

// 4. Cập nhật album
export const updateAlbum = async (req, res) => {
  try {
    const { title, artist, coverImage, songs } = req.body;

    // Nếu có songs, kiểm tra ID tồn tại
    if (songs && songs.length > 0) {
      const existingSongs = await Song.find({ _id: { $in: songs } });
      if (existingSongs.length !== songs.length) {
        return res
          .status(400)
          .json({ message: "Một số bài hát không tồn tại" });
      }
    }

    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { title, artist, coverImage, songs },
      { new: true }
    );

    if (!album)
      return res.status(404).json({ message: "Không tìm thấy album" });
    res.json(album);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật album", error: error.message });
  }
};

// 5. Xóa album
export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album)
      return res.status(404).json({ message: "Không tìm thấy album" });
    res.json({ message: "Xóa album thành công" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi xóa album", error: error.message });
  }
};
