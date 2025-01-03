const Task1 = require("../models/Task1");

const task1Controller = async (req, res) => {
    try {
        console.log("Body", req.body)
        const dataToInsert = req.body.fields
            .filter(field => field.name && field.value)
            .map(field => ({ name: field.name, value: field.value }));
        const data = await Task1.insertMany(dataToInsert);
        res.status(201).json({ message: 'Data saved successfully', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving data' });
    }
}

const getTask1Data = async (req, res) => {
    try {
        const data = await Task1.find();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data' });
    }
}


module.exports = { task1Controller, getTask1Data }