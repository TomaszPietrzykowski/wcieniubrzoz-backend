const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")

exports.pingEmail = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "success",
    message: "hit to GET email route and controller successful",
  })
})

exports.sendEmail = catchAsync(async (req, res, next) => {
  console.log(req.body)
  res.status(201).json({
    status: "success",
    message: "hit to POST route and send email controller successful",
  })
})
