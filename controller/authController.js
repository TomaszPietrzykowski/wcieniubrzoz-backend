const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
const catchAsync = require("../utilities/catchAsync")
const AppError = require("../utilities/appError")

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    avatar: req.body.avatar,
  })

  const token = signToken(newUser._id)

  res.status(201).json({
    status: "success",
    token,
    data: { user: newUser },
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { login, password } = req.body

  // check if login and password exist in req.bod
  if (!login || !password) {
    return next(new AppError("Podaj login i hasło", 400))
  }
  // check if user exists and password matches
  const user = await User.findOne({ login }).select("+password")

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Niepoprawny login lub hasło", 401))
  }
  // send response with a signed token
  const token = signToken(user._id)
  console.log(token)
  res.status(200).json({
    status: "success",
    token,
    data: {
      name: user.name,
      avatar: user.avatar,
    },
  })
})
