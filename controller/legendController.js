const legendModel = require("../model/legendModel")

exports.getAllLegends = async (req, res) => {
  try {
    const legends = await legendModel.find()
    res.status(200).json({
      status: "success",
      data: legends,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.createLegend = async (req, res) => {
  try {
    const newLegend = await legendModel.create(req.body)
    res.status(201).json({
      status: "success",
      data: newLegend,
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.getLegend = async (req, res) => {
  try {
    const legend = await legendModel.findOne({
      _id: req.params.id,
    })
    res.status(200).json({
      status: "success",
      data: legend,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.updateLegend = async (req, res) => {
  try {
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
    res.status(200).json({
      status: "success",
      data: legend,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.deleteLegend = async (req, res) => {
  try {
    await legendModel.findOneAndDelete({
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
