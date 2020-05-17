const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Podaj nazwę użytkownika"],
    trim: true,
    minlength: [2, "Podaj imię o długości 2 - 20 znaków"],
    maxlength: [20, "Podaj imię o długości 2 - 20 znaków"],
  },
  email: {
    type: String,
    required: [true, "Adres email jest wymagany"],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Podaj poprawny adres email"],
    unique: true,
  },
  avatar: {
    type: String,
  },
  login: {
    type: String,
    required: [true, "Podaj login"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Podaj hasło"],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Potwierdź hasło"],
    // Custom validators work on SAVE and CREATE methods, don't work with findOneAndUpdate
    validate: {
      validator: function (el) {
        return el === this.password
      },
    },
    message: "Hasło i potwierdzenie hasła musza być jednakowe",
  },
})

userSchema.pre("save", async function (next) {
  // only run if password was modified
  if (!this.isModified("password")) return next()

  // hash the password with coast of 10
  this.password = await bcrypt.hash(this.password, 10)

  // delete the passwordConfirm field
  this.passwordConfirm = undefined
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // userPassword is being passed rather then use this.password due to "select: false" prop
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model("User", userSchema)

module.exports = User
