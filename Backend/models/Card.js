//Card.js
const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    // Role-based assignment
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Profile fields
    backgroundImage: { type: String },
    profileImage: { type: String },
    location: { type: String },
    domainRole: { type: String },
    gmail: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    contactNo: { type: String },
    companyName: { type: String },
    companyDescription: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
