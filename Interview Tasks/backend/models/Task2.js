const { Schema, model } = require('mongoose')

const dataSchema = new Schema({
    segment: String,
    country: String,
    salePrice: String,
    date: Number
});

const Task2 = model("task2", dataSchema)

module.exports = Task2