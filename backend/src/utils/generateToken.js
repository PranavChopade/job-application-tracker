import jwt from "jsonwebtoken";
import ENV from "../config/ENV.js";

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    ENV.JWTSECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN }
  )
}