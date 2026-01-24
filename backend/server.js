require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin.routes");

const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
