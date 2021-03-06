const User = require("../model/userModel")
const catchAsync = require("../utilities/catchAsync")

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  })
})

exports.createUser = async (req, res) => {
  //   try {
  //     const newTip = await tipModel.create(req.body)
  //     res.status(201).json({
  //       status: "success",
  //       data: newTip,
  //     })
  //   } catch (err) {
  //     res.status(400).json({
  //       status: "fail",
  //       message: err.errmsg,
  //     })
  //   }
}

exports.getUser = async (req, res) => {
  //   try {
  //     const tip = await tipModel.findOne({
  //       _id: req.params.id,
  //     })
  //     res.status(200).json({
  //       status: "success",
  //       data: tip,
  //     })
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: err.errmsg,
  //     })
  //   }
}

exports.updateUser = async (req, res) => {
  //   try {
  //     const tip = await tipModel.findOneAndUpdate(
  //       {
  //         _id: req.params.id,
  //       },
  //       req.body,
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     )
  //     res.status(200).json({
  //       status: "success",
  //       data: tip,
  //     })
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: err.errmsg,
  //     })
  //   }
}

exports.deleteUser = async (req, res) => {
  //   try {
  //     await tipModel.findOneAndDelete({
  //       _id: req.params.id,
  //     })
  //     res.status(204).json({
  //       status: "success",
  //       data: null,
  //     })
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "fail",
  //       message: err.errmsg,
  //     })
  //   }
}
