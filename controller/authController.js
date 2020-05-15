const User = require("../model/userModel")

exports.signup = async (req, res, next) => {
  console.log("signup controller called")
  try {
    const newUser = await User.create(req.body)
    res.status(201).json({
      status: "success",
      data: newUser,
    })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      msg: err.errmsg,
    })
  }
}
