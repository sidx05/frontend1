import mongoose from "mongoose";

// Local lightweight logger to avoid importing backend code into the frontend build
const logger = {
  info: (...args: any[]) => console.log(...args),
  error: (...args: any[]) => console.error(...args),
};

export async function connectDB() {
  try {
    const uri = process.env.DATABASE_URL || "mongodb://localhost:27017/newshub";
    await mongoose.connect(uri);
    logger.info("✅ Connected to MongoDB (Mongoose)");
  } catch (err) {
    logger.error("❌ Failed to connect MongoDB", err);
    // Do not exit the process in Next.js environments; let the caller handle errors
    throw err;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
    logger.info("🔒 MongoDB connection closed");
  } catch (err) {
    logger.error("❌ Error closing MongoDB connection", err);
  }
}

export { mongoose }; 
