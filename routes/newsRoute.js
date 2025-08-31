const express = require("express");
const { getNews } = require("../controllers/newsController");
const validateJWT = require("../middleware/AuthMiddleware");

const router = express.Router();
router.get("/", validateJWT, getNews);
module.exports = router;
