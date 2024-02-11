const expressAsyncHandler = require("express-async-handler");
const Property = require("../models/property");

const addProperty = expressAsyncHandler(async (req, res, next) => {
    try {
        // Create a new property
        const property = new Property({
            agent: req.agentId,
            fortype: req.body.fortype,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            kitchen: req.body.kitchen,
            bedrooms: req.body.bedrooms,
            bathrooms: req.body.bathrooms,
            garage: req.body.garage,
            lounge: req.body.lounge,
            area: req.body.area,
            address: req.body.address,
            city: req.body.city,
            status: req.body.status,
            images: req.body.images
        });

        // Save the property to the database
        await property.save();

        return res.status(201).json({ message: "Property successfully created", property });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
})

// get all properties
const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find()
            .populate('agent', '-password');

        res.status(200).json({ properties: properties });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

const getSingleProperties = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find the property by its ID
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        return res.status(200).json({ property });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
})

// Query recent properties sorted by createdAt timestamp
const getRecentProperties = async (req, res) => {
    try {
        const recentProperties = await Property.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('agent', '-password');

        res.status(200).json({ properties: recentProperties });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Query rent properties
const getRentProperties = async (req, res) => {
    try {
        const properties = await Property.find({ fortype: "rent" })
            .populate('agent', '-password');

        res.status(200).json({ properties: properties });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};
// Query sell properties 
const getSellProperties = async (req, res) => {
    try {
        const properties = await Property.find({ fortype: "sell" })
            .populate('agent', '-password');

        res.status(200).json({ properties: properties });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { addProperty, getRecentProperties, getRentProperties, getSellProperties, getAllProperties, getSingleProperties }