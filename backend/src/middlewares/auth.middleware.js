import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    const decoded = jwt.verify(token, ENV.JWTSECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" })
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error in auth middleware:", error);
    res.status(401).json({ message: "Unauthorized" })
  }
}
export default isAuth