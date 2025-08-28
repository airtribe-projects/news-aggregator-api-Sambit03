const express = require("express");
const router = express.Router();
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferencesController");
const validateJWT = require("../middleware/AuthMiddleware");

router.get("/", validateJWT, getPreferences);
router.put("/", validateJWT, updatePreferences);

module.exports = router;
