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

  if (!dbUser) {
    throw new Error("User not found");
  }

  const isSamePassword = await bcrypt.compare(password, dbUser.password);
  if (!isSamePassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  return { status: "ok", token };
};

module.exports = { registerUser, loginUser };
