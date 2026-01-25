const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/admin", require("./routes/admin.routes"));

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
