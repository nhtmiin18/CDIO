require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cvRoutes = require("./routes/cv.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/student", require("./routes/student.routes"));
app.use("/api/cv", cvRoutes);
app.use("/api/posts", postRoutes);

const studentRoutes = require("./routes/student.routes");
app.use("/api/students", studentRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("API running");
});

module.exports = app;