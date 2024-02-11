const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const dbconnection = require("./utils/database/dbConnection")

const indexRoute = require("./routers/index")

// config dotenv file
dotenv.config({
    path: './config/config.env'
})

dbconnection()

app.use(express.json())
app.use(cors())

app.use("/", indexRoute)

const PORT = process.env.PORT || 6001
app.listen(PORT, () => {
    console.log("server stated at port ", PORT)
})