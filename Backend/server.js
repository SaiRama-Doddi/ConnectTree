const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));
const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes); // <-- add this

app.use("/api/users", require("./routes/userRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
