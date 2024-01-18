const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8001
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// routers
const authRouter = require('./routes/auth')

dotenv.config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB Atlas');

    // await createAuthCollection()
});

/// routes
app.use('/api/auth', authRouter)


app.listen(PORT, () => console.log("Server started at port: " + PORT))