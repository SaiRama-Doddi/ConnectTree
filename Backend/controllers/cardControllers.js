//cardControllers.js
const Card = require("../models/Card");
const User = require("../models/User");

// Create Card
exports.createCard = async (req, res) => {
  try {
    if (req.user.role === "User") {
      return res.status(403).json({ message: "Users cannot create cards" });
    }

    const { title, description, assignedTo, ...profileFields } = req.body;

    // Validate assigned user
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) return res.status(400).json({ message: "Assigned user not found" });

    // Managers can only assign to themselves
    if (req.user.role === "Manager" && assignedTo !== req.user._id.toString()) {
      return res.status(403).json({ message: "Managers can only assign cards to themselves" });
    }

    const card = await Card.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
      ...profileFields,
    });

    res.status(201).json(await card.populate("assignedTo createdBy", "username role email"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Cards (role-based)
exports.getCards = async (req, res) => {
  try {
    let cards;
    if (req.user.role === "Admin") {
      cards = await Card.find().populate("assignedTo createdBy", "username role email");
    } else if (req.user.role === "Manager") {
      cards = await Card.find().populate("assignedTo createdBy", "username role email");
    } else {
      cards = await Card.find({ assignedTo: req.user._id }).populate(
        "assignedTo createdBy",
        "username role email"
      );
    }
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Card
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (req.user.role === "Admin") {
      Object.assign(card, req.body);
    } else {
      if (card.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to edit this card" });
      }
      Object.assign(card, req.body);
    }

    await card.save();
    res.json(await card.populate("assignedTo createdBy", "username role email"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Card (Admin only)
exports.deleteCard = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can delete cards" });
    }
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single Card by ID
exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id)
      .populate("assignedTo createdBy", "username role email");

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // ✅ Role-based access:
    // - Admin can view all
    // - Manager can view all
    // - User can only view cards assigned to them
    if (
      req.user.role === "User" &&
      card.assignedTo &&
      card.assignedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to view this card" });
    }

    res.json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
