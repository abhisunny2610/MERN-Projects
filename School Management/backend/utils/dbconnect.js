const mongoose = require("mongoose")

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.URI)
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports =  dbconnection 