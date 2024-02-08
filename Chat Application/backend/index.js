const express = require('express')
const app = express()
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { handleErrors } = require('./MiddleWare/errorHandler')
const path = require("path");

// routers
const IndexRoute = require("./Routes/index")

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
 

app.use("/",IndexRoute)


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname1, "../frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------


app.use(handleErrors)

const server = app.listen(PORT, () => console.log("Server started on port " + PORT))

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: `http://localhost:3000`
    }
})

io.on("connection", (socket) => {
    // console.log("Connected to socket.io")

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        // console.log("userid", userData._id)
        socket.emit("connected");
    })

    socket.on("join chat", (room) => {
        socket.join(room)
        // console.log("User joined room" + room)
    })

    socket.on("typing", (room)=> socket.in(room).emit("typing"))
    socket.on("stop typing", (room)=> socket.in(room).emit("stop typing"))

    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat

        if (!chat.users) return  // console.log("chat.users not defined")

        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) return
            socket.in(user._id).emit("message received", newMessageReceived)
        })

    })

    socket.of("setup", () => {
        socket.leave("disconnected");
    })
})