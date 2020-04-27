const funfactModel = require("../model/funfactModel")

exports.getAllFunfacts = async (req, res) => {
  try {
    const funfacts = await funfactModel.find()
    res.status(200).json({
      status: "success",
      data: funfacts,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.createFunfact = async (req, res) => {
  try {
    const newFunfact = await funfactModel.create(req.body)
    res.status(201).json({
      status: "success",
      data: newFunfact,
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.getFunfact = async (req, res) => {
  try {
    const funfact = await funfactModel.findOne({
      _id: req.params.id,
    })
    res.status(200).json({
      status: "success",
      data: funfact,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.updateFunfact = async (req, res) => {
  try {
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
    res.status(200).json({
      status: "success",
      data: funfact,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.errmsg,
    })
  }
}

exports.deleteFunfact = async (req, res) => {
  try {
    await funfactModel.findOneAndDelete({
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
