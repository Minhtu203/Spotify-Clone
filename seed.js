import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Song from "./models/songModel.js";

dotenv.config();

const songs = [
  {
    name: "Muốn anh đau live",
    artist: "Winno",
    audioUrl:
      "https://res.cloudinary.com/dw53er2wv/video/upload/v1754627242/winno_avubrq.mp4",
    imageUrl:
      "https://res.cloudinary.com/dw53er2wv/image/upload/v1754628663/486753492_2633029806906391_2575357448352680568_n.jpg_tvotaz.jpg",
    album: "Album 1",
    plays: 0,
  },
  {
    name: "Show me love",
    artist: "MCK",
    audioUrl:
      "https://res.cloudinary.com/dw53er2wv/video/upload/v1754627737/ShowMeLove_d96i50.mp3",
    imageUrl:
      "https://res.cloudinary.com/dw53er2wv/image/upload/v1754629018/485802009_1343374523958914_6796516215702337036_n.jpg_r3w6fk.jpg",
    album: "Album 2",
    plays: 0,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Song.deleteMany(); // Xóa dữ liệu cũ nếu có
    await Song.insertMany(songs);
    console.log("✅ Dữ liệu mẫu đã được thêm");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
