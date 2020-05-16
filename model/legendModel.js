const mongoose = require("mongoose")
// Mongoose constructor:
// --- schema:
const legendSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tytuł jest wymagany"],
  },
  content: {
    type: Array,
    required: [true, "Treść jest wymagana"],
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
