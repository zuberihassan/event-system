const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  attended: { type: Boolean, default: false }
});

module.exports = mongoose.model("Guest", GuestSchema);
