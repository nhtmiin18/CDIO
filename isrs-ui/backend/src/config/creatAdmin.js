import bcrypt from "bcryptjs";
import User from "../models/User.js";

const createAdminAccount = async () => {
  try {
    const adminEmail = "admin123@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✅ Admin account already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Root123@", 10);

    const admin = new User({
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("🔥 Admin account created");
  } catch (error) {
    console.error("❌ Create admin error:", error);
  }
};

export default createAdminAccount;
