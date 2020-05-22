const express = require("express")
const fileUpload = require("express-fileupload")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const AppError = require("./utilities/appError")
const errorHandler = require("./controller/errorController")
const contentRouter = require("./router/contentRouter")
const userRouter = require("./router/userRouter")
const logger = require("./Logger")

// unhandled rejection catching have to be before any executing code:
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message)
  console.log("UNCAUGHT EXCEPTION :( Shutting the app down...")
  process.exit(1)
})

dotenv.config({ path: "./config.env" })
// Middleware cycle:
app.use(fileUpload())
app.use(cors())
app.use(express.urlencoded({ extended: false })) // <-- url parser
app.use(express.json()) // <-- body parser

// -- routing
app.use("/api/v1", contentRouter)
app.use("/api/v1/users", userRouter)
// catch all invalid routes - push err to error middleware by passing arg to next()
app.all("*", (req, res, next) => {
  next(new AppError(`Couldn't find ${req.originalUrl}`, 404))
})
//global error handling middleware
app.use(errorHandler)
const DB = process.env.DB_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    //options object - settings dealing with deprecation warnings:
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    // .connect() returns a promise
  })
  .then((con) => {
    // with .then we have access to connection obj, here: con
    logger.log("Mongo DB connected")
    console.log(
      `MongoDB successfuly connected...... \nDB user: ${con.connections[0].user}`
    )
  })
  .catch((err) => {
    logger.log(`Mongo DB connection failed: ${(err.name, err.message)}`)
    console.log(`Mongo DB connection failed: ${(err.name, err.message)}`)
  })

const PORT = process.env.PORT || 6000
const server = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}......`)
)

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message)
  console.log("UNHANDLED REJECTION :( Shutting the app down...")
  server.close(() => {
    process.exit(1)
  })
})
