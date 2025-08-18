import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    console.log("sendMessage called. Body:", req.body, "Params:", req.params);
    if (!token) return res.status(401).json({ message: "No token" });
    const verified = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verified) return res.status(403).json({ message: "Invalid token" });
    console.log("user id: ", verified);
    const user = await User.findById(verified.userID).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "internal server error" });
  }
};

export default secureRoute;
