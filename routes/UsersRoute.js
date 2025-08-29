const express = require("express");
const {
  registerUserController,
  loginUserController,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", registerUserController);
router.post("/login", loginUserController);

module.exports = router;
