const mongoose = require("mongoose")
// Mongoose constructor:
// --- schema:
const legendSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  icon: {
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
const legendModel = mongoose.model("Legend", legendSchema)

module.exports = legendModel
