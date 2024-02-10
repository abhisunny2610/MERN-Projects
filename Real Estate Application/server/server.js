const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

// config dotenv file
dotenv.config({
    path: './config/config.env'
})

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 6001
app.listen(PORT, () => {
    console.log("server stated at port ", PORT)
})