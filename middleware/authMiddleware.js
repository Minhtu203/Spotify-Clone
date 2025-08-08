import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

export const protect = ClerkExpressWithAuth({
  // Clerk sẽ tự kiểm tra token và gắn user vào req.auth
  onError: (err, req, res, next) => {
    console.error("Auth Error:", err);
    return res.status(401).json({ message: "Not authorized" });
  },
});
