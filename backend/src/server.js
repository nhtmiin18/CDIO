const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("🔥 CORRECT server.js loaded");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== TEST ROOT =====
app.get("/", (req, res) => {
    res.send("Backend ISRS is running");
});

// ===== ROUTES =====
// server.js nằm trong src/
// routes nằm ngang cấp src → dùng ../
const internshipPostRoutes = require("../routes/internshipPost.routes");
app.use("/api/admin/internship-posts", internshipPostRoutes);

// ===== DASHBOARD (MOCK DATA FOR FRONTEND) =====
app.get("/api/dashboard", async (req, res) => {
    try {
        res.json({
            users: 12,
            companies: 3,
            posts: 8,
            recruiters: 2,
            matches: 15,

            userGrowth: [
                { name: "Jan", users: 2 },
                { name: "Feb", users: 5 },
                { name: "Mar", users: 8 },
                { name: "Apr", users: 10 },
                { name: "May", users: 12 }
            ],

            postStatus: [
                { name: "Active", value: 5 },
                { name: "Closed", value: 3 }
            ]
        });
    } catch (err) {
        res.status(500).json({ message: "Dashboard error" });
    }
});

// ===== 404 HANDLER =====
app.use((req, res) => {
    res.status(404).json({ message: "API not found" });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});

// ===== START SERVER AFTER DB CONNECT =====
const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log("Server running on port " + PORT);
        });
    })
    .catch(err => console.error("MongoDB error:", err));