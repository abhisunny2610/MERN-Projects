const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const dbconnection = require('./utils/dbconnect')
const indexRouter = require('./routes/index')
const multer = require("multer")

// config 
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// for uploading files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
})

// connecting database
dbconnection()

// routes
app.use("/api", indexRouter)

const upload = multer({storage: storage})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})
