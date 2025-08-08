import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { users as clerkUsers } from "@clerk/clerk-sdk-node";
import User from "../models/userModel.js";

export const authCallback = async (req, res) => {
  try {
    const { id } = req.body; // id từ Clerk gửi lên

    if (!id) {
      return res.status(400).json({ error: "Missing Clerk user ID" });
    }

    // Lấy thông tin user từ Clerk
    const clerkUser = await clerkUsers.getUser(id);

    if (!clerkUser) {
      return res.status(404).json({ error: "User not found in Clerk" });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const imageUrl = clerkUser.imageUrl;
    const userName = `${clerkUser.firstName || ""} ${
      clerkUser.lastName || ""
    }`.trim();

    // Kiểm tra user đã tồn tại trong MongoDB chưa
    let user = await User.findOne({ clerkId: id });

    if (!user) {
      user = await User.create({
        clerkId: id,
        userName,
        imageUrl,
        email,
      });
    }

    // Tạo JWT token để client sử dụng
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Auth callback error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
