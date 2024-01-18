const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8001
const mongoose = require('mongoose')

dotenv.config()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

app.listen(PORT, () => console.log("Server started at port: " + PORT))