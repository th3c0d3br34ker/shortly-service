const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  url_code: String,
  long_url: String,
  short_url: String,
  date: { type: String, default: Date.now },
});

module.exports = mongoose.model("URL", urlSchema);