const funfactModel = require("../model/funfactModel")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")

exports.getAllFunfacts = catchAsync(async (req, res, next) => {
  const funfacts = await funfactModel.find()

  res.status(200).json({
    status: "success",
    results: funfacts.length,
    data: funfacts,
  })
})

exports.createFunfact = catchAsync(async (req, res, next) => {
  const newFunfact = await funfactModel.create(req.body)
  res.status(201).json({
    status: "success",
    data: newFunfact,
  })
})

exports.getFunfact = catchAsync(async (req, res, next) => {
  const funfact = await funfactModel.findOne({
    _id: req.params.id,
  })

  if (!funfact) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: funfact,
  })
})

exports.updateFunfact = catchAsync(async (req, res, next) => {
  const funfact = await funfactModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!funfact) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(200).json({
    status: "success",
    data: funfact,
  })
})

exports.deleteFunfact = catchAsync(async (req, res, next) => {
  const funfact = await funfactModel.findOneAndDelete({
    _id: req.params.id,
  })

  if (!funfact) {
    return next(new AppError("Legenda o podanym id nie istnieje w bazie", 404))
  }

  res.status(204).json({
    status: "success",
    data: null,
  })
})
