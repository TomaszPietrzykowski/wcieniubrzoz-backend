const mongoose = require("mongoose")
// Mongoose constructor:
// --- schema:
const legendSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
const legendModel = mongoose.model("Legend", legendSchema)

module.exports = legendModel
