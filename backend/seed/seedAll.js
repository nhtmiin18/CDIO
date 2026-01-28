require("dotenv").config({ path: "../.env" });
mongoose.connect(process.env.MONGO_URI);
const mongoose = require("mongoose");

async function run() {
    await mongoose.connect(process.env.MONGO_URI);

    await require("./seedUsers")();
    await require("./seedActivities")();
    await require("./seedInternships")();

    console.log("✅ All seeds completed");
    process.exit();
}

run();
