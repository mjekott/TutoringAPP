/**
 * 1. Create a conenction  function for mongodb
 * 2. Start a local mongodb server conenction
 */
const mongoose = require("mongoose");
require("dotenv").config;

// Create the connection function
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("DB CONNECTED");

    //Seed Data
  } catch (error) {
    console.error(error.message);

    // Exit with failure
    process.exit(1);
  }
};

module.exports = connectDb;
