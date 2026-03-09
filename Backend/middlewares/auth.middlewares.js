const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  // console.log("Auth Middleware Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  // *** FIXED LINE ***
  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

  // console.log("Is Blacklisted:", isBlacklisted);

  if (isBlacklisted) {
    return res.status(401).json({ message: "Logged out user - Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found - Unauthorized" });
    }

    req.user = user;
    // console.log("Decoded:", decoded);
    console.log("User found:", user);
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Captain" });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
  if (isBlacklisted) {
    return res
      .status(401)
      .json({ message: "Logged out captain - Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized Captain" });
  }
};
