const express = require("express")
const app = express()
const cors = require("cors")
const indexrouter = require("./routes/index")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const connectToDatabase = require("./helper/dbconnection")

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads/', express.static('uploads'));
app.use('/api', indexrouter)

connectToDatabase()

app.listen(5000, () => {
    console.log("Server started at port 5000")
})