const express = require("express")
const createError = require("http-errors")
const morgan = require("morgan")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

app.get("/", async (req, res, next) => {
  res.send({
    message: "Hello World, it worko",
  })
})

app.use("/api", require("./routes/api.route"))

app.use((req, res, next) => {
  next(createError(createError.NotFound()))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
