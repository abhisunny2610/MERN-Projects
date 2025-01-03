const express = require('express');
const connectDB = require('./database/dbconfig');
const app = express();
const cors = require("cors");

const routes = require("./routes/TaskRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = 9000;

connectDB();

app.use("/", routes);

app.listen(PORT, () => console.log("----------> Server started at port: " + PORT));
