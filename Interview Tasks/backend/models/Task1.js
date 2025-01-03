const { Schema, model } = require('mongoose')

const Task1Schema = new Schema({
    name: String,
    value: String,
});

const Task1 = model("Task1", Task1Schema)

module.exports = Task1