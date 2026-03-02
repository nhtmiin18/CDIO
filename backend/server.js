require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cvRoutes = require("./routes/cv.routes");

const app = express();

connectDB();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/student", require("./routes/student.routes"));

app.get("/", (req, res) => {
    res.send("API running");
});

app.use("/api/cv", cvRoutes);

module.exports = app;