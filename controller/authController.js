const { promisify } = require("util")
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
    passwordChangedAt: req.body.passwordChangedAt,
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

exports.protect = catchAsync(async (req, res, next) => {
  // check if token provided
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError("Zaloguj się aby uzuskać dostęp", 401))
  }
  // validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  // check if user still exist
  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(
      new AppError("Użytkownik powiązany z tokenem już nie istnieje", 401)
    )
  }
  // check if user did change the password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("Użytkownik zmienił hasło", 401))
  }
  // grant access to protected route
  req.user = currentUser
  next()
})
