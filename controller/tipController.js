const tipModel = require("../model/tipModel")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")

exports.getAllTips = catchAsync(async (req, res, next) => {
  const tips = await tipModel.find()
  res.status(200).json({
    status: "success",
    results: tips.length,
    data: tips,
  })
})

exports.createTip = catchAsync(async (req, res, next) => {
  const newTip = await tipModel.create(req.body)
  res.status(201).json({
    status: "success",
    data: newTip,
  })
})

exports.getTip = catchAsync(async (req, res, next) => {
  const tip = await tipModel.findOne({
    _id: req.params.id,
  })

  if (!tip) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: tip,
  })
})

exports.updateTip = catchAsync(async (req, res, next) => {
  const tip = await tipModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!tip) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: tip,
  })
})

exports.deleteTip = catchAsync(async (req, res, next) => {
  const tip = await tipModel.findOneAndDelete({
    _id: req.params.id,
  })

  if (!tip) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(204).json({
    status: "success",
    data: null,
  })
})
