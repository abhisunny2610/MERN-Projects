const {Schema, model} = require("mongoose")

const blogSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    },
    coverImage: {
        type: String,
        
    }
})

const Blog = model("blog", blogSchema)

module.exports = Blog