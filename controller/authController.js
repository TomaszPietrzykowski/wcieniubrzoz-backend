const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res, next) => {
  try {
    // const newUser = await User.create(req.body)
    // above line deprecieted for security reasons
    // (user permission tier can be manually inserted e.g.)
    // use object literal instead to pass only fields we want:
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      login: req.body.login,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })

    res.status(201).json({
      status: "success",
      token,
      data: { user: newUser },
    })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      msg: err.errmsg,
    })
  }
}

// exports.login = (req, res, next)
