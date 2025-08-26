const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Admin: Create User (User/Manager)
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can create users" });
    }

    if (!["User", "Manager"].includes(role)) {
      return res.status(400).json({ message: "Invalid role assignment" });
    }

    const user = await User.create({ username, email, password, role });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login (all roles)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users (Admin only)
exports.getUsers = async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Only Admin can view users" });
    }

    const users = await User.find().select("_id username email role");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID (Admin or self)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("_id username email role");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role !== "Admin" && req.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to view this user" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
