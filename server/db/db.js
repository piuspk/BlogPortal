const mongoose = require("mongoose");

const URL = process.env.URL;
try {
  mongoose.connect(URL);
  console.log("Database connected successfully");
} catch (error) {
  console.log("error while connection with db", error);
}
