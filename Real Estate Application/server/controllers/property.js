const expressAsyncHandler = require("express-async-handler");
const Property = require("../models/property");

const addProperty = expressAsyncHandler(async (req, res, next) => {


    try {
        // Create a new property
        const property = new Property({
            agent: agentId, 
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
            images: req.body.images
        });

        // Save the property to the database
        await property.save();

        return res.status(201).json({ message: "Property successfully created", property });
    } catch (error) {
        return res.status(500).send("Server Error");
    }
})

module.exports = { addProperty }