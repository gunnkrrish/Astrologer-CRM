const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error("ERROR: MONGO_URI not set in environment variables");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(mongoUri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
      family: 4
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error.message);
    console.error("\nTroubleshooting steps:");
    console.error("1. Check if MONGO_URI is correct in environment variables");
    console.error("2. In MongoDB Atlas, whitelist 0.0.0.0/0 (Network Access)");
    console.error("3. Ensure database user has correct credentials");
    process.exit(1);
  }
};

module.exports = connectDB;