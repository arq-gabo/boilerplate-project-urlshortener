const mongoose = require("mongoose");

let ShortUrlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: Number,
});

module.exports = mongoose.model("Urlsdata", ShortUrlSchema);
