const Task2 = require("../models/Task2");

const task2Controller = async (req, res) => {
  try {
    const data = req.body.data;
    if (!data || data.length === 0) {
      return res.status(400).json({ message: 'No data received' });
    }
    const formattedData = data.map((row) => {
      const formattedRow = {};
      Object.keys(row).forEach((key) => {
        const camelCaseKey = key.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        ).replace(/\s+/g, '');

        formattedRow[camelCaseKey] = typeof row[key] === 'string' ? row[key].trim() : row[key];
      });
      return formattedRow;
    });

    const uniqueData = [];
    const seen = new Set();
    formattedData.forEach(item => {
      const stringifiedItem = JSON.stringify(item);
      if (!seen.has(stringifiedItem)) {
        uniqueData.push(item);
        seen.add(stringifiedItem);
      }
    });

    await Task2.insertMany(uniqueData);

    res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: 'Error saving data to the database' });
  }
};



const task2getData = async (req, res) => {
  try {
    const data = await Task2.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
}

module.exports = { task2Controller, task2getData }
