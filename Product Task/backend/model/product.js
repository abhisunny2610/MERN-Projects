const { model, Schema } = require("mongoose")

const productSchema = new Schema({
    "name": {
        type: String,
        require: true
    },
    "description": {
        type: "String",
        require: true
    },
    "category": {
        type: String,
        require: true
    },
    "price": {
        type: Number,
        requrie: true
    },
    "images": [{
        type: String
    }]
}, { timestamps: true })

const Product = model("Product", productSchema)

module.exports = Product


