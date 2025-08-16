import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Ẩn password khi trả về
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra trùng email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Trả về user nhưng không gửi password
    const { password: _, ...userData } = user.toObject();
    res.status(201).json(userData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Lấy id từ params
    if (!req.user.admin && req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa user này" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params; // id user
    const updateData = req.body; // dữ liệu mới gửi từ client

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData }, // chỉ update những trường gửi lên
      { new: true, runValidators: true } // trả về bản mới nhất và validate
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
