const legendModel = require("../model/legendModel")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")

exports.getAllLegends = catchAsync(async (req, res, next) => {
  const legends = await legendModel.find()
  res.status(200).json({
    status: "success",
    data: legends,
  })
})

exports.createLegend = catchAsync(async (req, res, next) => {
  const newLegend = await legendModel.create(req.body)
  res.status(201).json({
    status: "success",
    data: newLegend,
  })
})

exports.getLegend = catchAsync(async (req, res, next) => {
  const legend = await legendModel.findOne({
    _id: req.params.id,
  })

  if (!legend) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: legend,
  })
})

exports.updateLegend = catchAsync(async (req, res, next) => {
  const legend = await legendModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!legend) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: legend,
  })
})

exports.deleteLegend = catchAsync(async (req, res, next) => {
  const legend = await legendModel.findOneAndDelete({
    _id: req.params.id,
  })

  if (!legend) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(204).json({
    status: "success",
    data: null,
  })
})
