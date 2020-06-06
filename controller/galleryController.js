const galleryModel = require("../model/galleryModel")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")

exports.getAllGalleries = catchAsync(async (req, res, next) => {
  const galleries = await galleryModel.find()
  res.status(200).json({
    status: "success",
    results: galleries.length,
    data: galleries,
  })
})
exports.getPublicGalleries = catchAsync(async (req, res, next) => {
  const galleries = await galleryModel.find({ isPublic: true })
  res.status(200).json({
    status: "success",
    results: galleries.length,
    data: galleries,
  })
})

exports.createGallery = catchAsync(async (req, res, next) => {
  const newGallery = await galleryModel.create(req.body)
  res.status(201).json({
    status: "success",
    data: newGallery,
  })
})

exports.getGallery = catchAsync(async (req, res, next) => {
  const gallery = await galleryModel.findOne({
    _id: req.params.id,
  })

  if (!gallery) {
    return next(new AppError("Kolekcja o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: gallery,
  })
})

exports.updateGallery = catchAsync(async (req, res, next) => {
  const gallery = await galleryModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!gallery) {
    return next(new AppError("Kolekcja o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: gallery,
  })
})

exports.deleteGallery = catchAsync(async (req, res, next) => {
  const gallery = await galleryModel.findOneAndDelete({
    _id: req.params.id,
  })

  if (!gallery) {
    return next(new AppError("Kolekcja o podanym id nie istnieje w bazie", 404))
  }

  res.status(204).json({
    status: "success",
    data: null,
  })
})
