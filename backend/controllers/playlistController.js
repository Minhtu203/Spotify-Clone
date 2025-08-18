import Playlist from "../models/playlistModel.js";
import Song from "../models/songModel.js";

// @desc    Lấy tất cả playlist
// @route   GET /api/playlists
// @access  Public
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// @desc    Lấy chi tiết playlist theo ID
// @route   GET /api/playlists/:id
// @access  Public
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// @desc    Tạo playlist mới
// @route   POST /api/playlists
// @access  Private
export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Tên playlist là bắt buộc" });
    }

    const playlist = new Playlist({
      name,
      description,
      user: req.user._id, // lấy từ protect middleware
    });

    const createdPlaylist = await playlist.save();
    res.status(201).json(createdPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// @desc    Cập nhật playlist
// @route   PUT /api/playlists/:id
// @access  Private
export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    // Chỉ chủ sở hữu mới được sửa
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền sửa playlist này" });
    }

    playlist.name = req.body.name || playlist.name;
    playlist.description = req.body.description || playlist.description;

    const updatedPlaylist = await playlist.save();
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// @desc    Xóa playlist
// @route   DELETE /api/playlists/:id
// @access  Private
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa playlist này" });
    }

    await playlist.deleteOne();
    res.json({ message: "Playlist đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// @desc    Thêm bài hát vào playlist
// @route   POST /api/playlists/:id/songs
// @access  Private
export const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    const { songId } = req.body;

    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền sửa playlist này" });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
    }

    const updatedPlaylist = await playlist.save();
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// @desc    Xóa bài hát khỏi playlist
// @route   DELETE /api/playlists/:id/songs/:songId
// @access  Private
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền sửa playlist này" });
    }

    playlist.songs = playlist.songs.filter(
      (song) => song.toString() !== req.params.songId
    );

    const updatedPlaylist = await playlist.save();
    res.json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
