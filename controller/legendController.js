const legendModel = require("../model/legendModel")

exports.getLegends = async (req, res) => {
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
