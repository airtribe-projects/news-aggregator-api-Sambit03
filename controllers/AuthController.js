const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  const newUser = await User.create(user);
  return newUser;
};

const loginUser = async (email, password) => {
  const body = {
    email: email,
  };

  const dbUser = await User.findOne(body);

  if (!dbUser) {
    throw new Error("User not found");
  }

  const isSamePassword = await bcrypt.compare(password, dbUser.password);

  if (!isSamePassword) {
    throw new Error("Invalid Password");
  }

  const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { status: "ok", token };
};

module.exports = { registerUser, loginUser };
