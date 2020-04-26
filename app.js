const express = require("express")

const app = express()
const contentRouter = require("./router/contentRouter")

// Middleware cycle:
app.use(express.urlencoded({ extended: false })) // <-- url parser
app.use(express.json()) // <-- body parser
// -- routing
app.use("/", contentRouter)

module.exports = app
