// controllers/artistController.js
import Artist from "../models/artistModel.js";

// @desc    Tạo artist mới
// @route   POST /api/artists
// @access  Private
export const createArtist = async (req, res) => {
  try {
    const { name, imageUrl, description } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ message: "Name và imageUrl là bắt buộc" });
    }

    const artist = await Artist.create({
      name,
      imageUrl,
      description: description || "",
    });

    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả artists
// @route   GET /api/artists
// @access  Public
export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find().sort({ name: 1 });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: "Không tìm thấy artist" });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cập nhật artist
// @route   PUT /api/artists/:id
// @access  Private
export const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Không tìm thấy artist" });
    }

    artist.name = req.body.name || artist.name;
    artist.imageUrl = req.body.imageUrl || artist.imageUrl;
    artist.description = req.body.description || artist.description;

    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa artist
// @route   DELETE /api/artists/:id
// @access  Private
export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Không tìm thấy artist" });
    }

    await artist.deleteOne();
    res.json({ message: "Đã xóa artist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
