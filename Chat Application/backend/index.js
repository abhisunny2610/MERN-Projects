const express = require('express')
const app = express()
const dotenv = require('dotenv')
const PORT = process.env.PORT || 6001
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { handleErrors } = require('./MiddleWare/errorHandler')

// routers
const authRoutes = require('./Routes/auth')
const chatRoutes = require('./Routes/chat')
const messageRoues = require('./Routes/message')

dotenv.config()
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// databse connection
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB Atlas');
});


app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoues)

app.use(handleErrors)

const server = app.listen(PORT, () => console.log("Server started on port " + PORT))

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors:  {
        origin: `http://localhost:${PORT}`
    }
})

io.on("connection", (socket)=> {
    console.log("Connected to socket.io")
})