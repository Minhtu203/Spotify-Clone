import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, require: true },
    userName: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    liked: {
      artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
      albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
      songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
