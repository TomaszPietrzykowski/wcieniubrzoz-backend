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

exports.sendTestMsg = async (req, res) => {
  try {
    const legends = "To jest testowy endpoint dla GET request"
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
