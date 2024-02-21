const express = require("express")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const dbconnection = require('./utils/dbconnect')
const indexRouter = require('./routes/index')

// config 
dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// connecting database
dbconnection()

// routes
app.use("/api", indexRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`)    
})
