const express = require('express')
const dotenv = require('dotenv')
const app = express()
const PORT = process.env.PORT || 8000
const userRouter = require('./routes/user')
const notesRouter = require('./routes/notes')
const { connectDB } = require('./connect')
const { notFound, errorHandler } = require('./middlesware/errorMiddleware')
const bodyParser = require('body-parser')
const cors = require('cors')

// connect db 
connectDB()

dotenv.config()
// app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
// app.use(notFound)
// app.use(errorHandler)
app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/notes', notesRouter)

app.listen(PORT, () => console.log("Server started at port: " + PORT))