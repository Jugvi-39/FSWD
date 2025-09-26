// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB (using Compass URI)
mongoose.connect("mongodb://127.0.0.1:27017/mern-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model("User", UserSchema);

// ✅ Health & root routes
app.get("/", (req, res) => {
    res.status(200).json({ ok: true, service: "backend", ts: Date.now() });
});

app.get("/health", (req, res) => {
    const mongoState = mongoose.connection.readyState; // 1 = connected
    res.status(200).json({ ok: true, mongoConnected: mongoState === 1 });
});

// ✅ Register Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("/register error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        return res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("/login error", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// 404 handler to avoid HTML responses
app.use((req, res) => {
    return res.status(404).json({ success: false, message: "Not Found" });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error("Unhandled error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
