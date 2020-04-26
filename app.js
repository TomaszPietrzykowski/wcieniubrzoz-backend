const express = require("express")

const app = express()
const contentRouter = require("./router/contentRouter")

// Middleware cycle:
app.use(express.json()) // <-- body parser
// -- routing
app.use("/api/v1", contentRouter)

module.exports = app
