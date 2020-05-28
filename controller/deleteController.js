const legendModel = require("../model/legendModel")
const galleryModel = require("../model/galleryModel")
const tipModel = require("../model/tipModel")
const funfactModel = require("../model/funfactModel")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")
const fs = require("fs")
const path = require("path")

exports.delete = catchAsync(async (req, res, next) => {
  if (!req.body.file) {
    return next(new AppError("File data missing in request body", 400))
  }
  const queryString = `https://gardens.barracudadev.com/uploads/${req.body.file}`
  const tipsRel = await tipModel.find({ image: queryString })
  const funfactsRel = await funfactModel.find({ image: queryString })
  const legendsRel = await legendModel.find({ image: queryString })
  const galleryRel = await galleryModel.find({ images: queryString })
  const documentCount =
    tipsRel.length + funfactsRel.length + legendsRel.length + galleryRel.length
  const filePath = path.join(__dirname, "../public/uploads", req.body.file)

  if (documentCount === 0) {
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
  }
})
