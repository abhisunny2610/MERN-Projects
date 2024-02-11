// models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    fortype: {
        type:String,
        enum: ["sell", "rent"],
        required: true
    },
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: String,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    kitchen: {
        type: String,
        // required: true
    },
    bedrooms: {
        type: String,
        // required: true
    },
    bathrooms: {
        type: String,
        // required: true
    },
    garage: {
        type: Boolean,
        // required: true
    },
    lounge: {
        type: Boolean,
        // required: true
    },
    area: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    city: {
        type: String,
        // required: true
    },
    images: [{
        type: String,
        // required: true
    }]

}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
