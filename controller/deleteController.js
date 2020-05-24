const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")
const fs = require("fs")
const path = require("path")

exports.delete = catchAsync(async (req, res, next) => {
  if (!req.body.file) {
    return next(new AppError("File data missing in request body", 400))
  }

  const filePath = path.join(__dirname, "../public/uploads", req.body.file)

  fs.access(filePath, (err) => {
    if (err) {
      return next(new AppError("File not found", 404))
    } else {
      fs.unlink(filePath, (err) => {
        if (err) {
          return next(new AppError("Error deleting file"))
        } else {
          res.status(204).json({
            status: "success",
            data: null,
          })
        }
      })
    }
  })
})
