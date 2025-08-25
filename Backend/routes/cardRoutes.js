//cardRoutes.js
const express = require("express");
const { createCard, getCards, updateCard, deleteCard ,getCardById} = require("../controllers/cardControllers");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createCard);
router.get("/", protect, getCards);
router.put("/:id", protect, updateCard);
router.delete("/:id", protect, deleteCard);
router.get("/:id", protect, getCardById);   // 👈 new

module.exports = router;
