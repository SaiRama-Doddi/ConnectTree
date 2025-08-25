//authRoutes.js
const express = require("express");
const { registerUser, login } = require("../controllers/authControllers");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Admin creates users/managers
router.post("/register", protect, authorize("Admin"), registerUser);
router.post("/login", login);

module.exports = router;
