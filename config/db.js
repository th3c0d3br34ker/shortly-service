const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("¯¯__(ツ)__/¯¯");
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
