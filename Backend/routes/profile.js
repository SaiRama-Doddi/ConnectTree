// routes/profile.js
const express = require("express");
const User = require("../models/User");
const Card = require("../models/Card");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @route   GET /api/profile/me
 * @desc    Get logged-in user profile with card details
 */
router.get("/me", protect, async (req, res) => {
  try {
    // Get user basic details
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get card details assigned to the user
    const card = await Card.findOne({ assignedTo: req.user._id })
      .populate("assignedTo createdBy", "username email role");

    res.json({
      user,
      card
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/profile/update
 * @desc    Update logged-in user profile (both user + card fields)
 */
router.put("/update", protect, async (req, res) => {
  try {
    const updates = req.body;

    // Update User basic info
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select("-password");

    // Update Card profile fields if exist
    let updatedCard = await Card.findOneAndUpdate(
      { assignedTo: req.user._id },
      { $set: updates },
      { new: true }
    ).populate("assignedTo createdBy", "username email role");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
      card: updatedCard,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
