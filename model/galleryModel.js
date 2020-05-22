const mongoose = require("mongoose")

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: Array,
  },
  images: {
    type: Array,
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
})

const galleryModel = mongoose.model("Gallery", gallerySchema)

module.exports = galleryModel
