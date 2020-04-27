const tipModel = require("../model/tipModel")

exports.getAllTips = async (req, res) => {
  try {
    const tips = await tipModel.find()
    res.status(200).json({
      status: "success",
      data: tips,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.createTip = async (req, res) => {
  try {
    const newTip = await tipModel.create(req.body)
    res.status(201).json({
      status: "success",
      data: newTip,
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.getTip = async (req, res) => {
  try {
    const tip = await tipModel.findOne({
      _id: req.params.id,
    })
    res.status(200).json({
      status: "success",
      data: tip,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.updateTip = async (req, res) => {
  try {
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
    res.status(200).json({
      status: "success",
      data: tip,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.deleteTip = async (req, res) => {
  try {
    await tipModel.findOneAndDelete({
      _id: req.params.id,
    })
    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}
