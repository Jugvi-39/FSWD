const mongoose = require("mongoose");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/internalexam";
  const maxRetries = 5;
  const retryDelayMs = 1500;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connecting to MongoDB (${attempt}/${maxRetries}) -> ${uri}`);
      await mongoose.connect(uri, {
        autoIndex: true,
      });
      console.log("MongoDB Connected");
      return true;
    } catch (error) {
      console.error(`MongoDB connection failed (attempt ${attempt}):`, error.message);
      if (attempt === maxRetries) {
        console.error("Max retries reached. Exiting.");
        process.exit(1);
      }
      await sleep(retryDelayMs);
    }
  }
};

module.exports = connectDB;
