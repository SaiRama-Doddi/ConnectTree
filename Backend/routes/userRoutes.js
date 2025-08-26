const express = require("express");
const {
  registerUser,
  login,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
router.post("/", protect, registerUser);      // Create User (Admin)
router.get("/", protect, getUsers);          // List Users (Admin)
router.get("/:id", protect, getUserById);    // Get single user (Admin or self)

module.exports = router;
