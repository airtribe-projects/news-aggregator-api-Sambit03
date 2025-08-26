const { registerUser, loginUser } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  const user = req.body;
  const dbUser = await registerUser(user);
  res.send(dbUser);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const dbUser = await loginUser(email, password);
  res.send(dbUser);
});

module.exports = router;
