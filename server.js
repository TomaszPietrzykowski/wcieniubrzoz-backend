const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({ path: "./config.env" })

const app = require("./app")

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
    console.log(
      `MongoDB successfuly connected...... \nDB user: ${con.connections[0].user}`
    )
  })
  .catch(() => {
    console.log("DB connection failed")
  })

const PORT = process.env.PORT || 6000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}......`))
