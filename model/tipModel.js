const mongoose = require("mongoose")
// Mongoose constructor:
// --- schema:
const tipSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
  },
  source: {
    type: String,
  },
  source_url: {
    type: String,
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
})
// --- model:
const tipModel = mongoose.model("Tip", tipSchema)

module.exports = tipModel
