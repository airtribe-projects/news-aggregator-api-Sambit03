const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
  if (!user.name || !user.email || !user.password) {
    throw new Error("Missing required fields");
  }
  user.password = await bcrypt.hash(user.password, 10);
  return await User.create(user);
};

const loginUser = async (email, password) => {
  const dbUser = await User.findOne({ email });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (!dbUser) {
    throw new Error("User not found");
  }

  const isSamePassword = await bcrypt.compare(password, dbUser.password);
  if (!isSamePassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: dbUser._id, email: dbUser.email, role: dbUser.role },
    JWT_SECRET,
    {
      expiresIn: "4h",
    }
  );

  return { status: "ok", token };
};

module.exports = { registerUser, loginUser };
