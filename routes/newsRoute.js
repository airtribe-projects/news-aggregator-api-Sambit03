const express = require("express");
const { getNews } = require("../controllers/newsController");
const validateJWT = require("../middleware/AuthMiddleware");

const route = express.Router();
route.get("/", validateJWT, getNews);
module.exports = route;
