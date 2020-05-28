const legendModel = require("../model/legendModel")
const galleryModel = require("../model/galleryModel")
const tipModel = require("../model/tipModel")
const funfactModel = require("../model/funfactModel")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")
const fs = require("fs")
const path = require("path")

exports.uploadFile = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      status: "fail",
      msg: "No file uploaded",
    })
  }

  const file = req.files.file
  file.mv(`${__dirname}/../public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    } else {
      res.json({
        fileName: file.name,
        filePath: `http://www.barracudadev.com/uploads/${file.name}`,
      })
    }
  })
}

exports.checkRedundancy = catchAsync(async (req, res, next) => {
  if (!req.body.queryString) {
    return next(new AppError("Query string missing", 400))
  }
  const queryString = req.body.queryString
  const tips = await tipModel.find({ image: queryString })
  const funfacts = await funfactModel.find({ image: queryString })
  const legends = await legendModel.find({ image: queryString })
  const gallery = await galleryModel.find({ images: queryString })
  const documentCount =
    tips.length + funfacts.length + legends.length + gallery.length
  res.status(200).json({
    status: "success",
    isRedundant: documentCount === 0 ? true : false,
    connectedDocs: documentCount,
    data: [...tips, ...funfacts, ...legends, ...gallery],
  })
})

exports.listFTP = catchAsync(async (req, res, next) => {
  const querryArray = []

  // ---------------

  fs.readdir(path.join(__dirname, "../public/uploads"), function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err)
    }
    files.forEach(function (file) {
      querryArray.push(file)
    })
    res.json({
      status: "success",
      results: querryArray.length,
      data: querryArray,
    })
  })
})

exports.getRedundant = catchAsync(async (req, res, next) => {
  if (req.body.files === null) {
    return next(new AppError("Querry Array missing in req body", 400))
  }
  const files = [...req.body.files]
  const noRefferArray = []
  await Promise.all(
    files.map(async (file) => {
      const queryString = `https://gardens.barracudadev.com/uploads/${file}`
      const tips = await tipModel.find({ image: queryString })
      const funfacts = await funfactModel.find({ image: queryString })
      const legends = await legendModel.find({ image: queryString })
      const gallery = await galleryModel.find({ images: queryString })
      const documentCount =
        tips.length + funfacts.length + legends.length + gallery.length
      if (documentCount === 0) {
        noRefferArray.push(file)
      }
    })
  )
  res.status(200).json({
    status: "success",
    redundantFiles: noRefferArray.length,
    data: noRefferArray,
  })
})
