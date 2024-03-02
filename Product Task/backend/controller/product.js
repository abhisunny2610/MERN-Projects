const Product = require("../model/product");

const addProduct = async (req, res) => {
    try {
       
        const { name, description, category, price } = req.body;
        const images = req.files ? req.files.map(file => file.filename) : [];
        const product = new Product({ name, description, category, price, images });
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Failed to add product. Please try again later.');
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        // // Remove images associated with the product
        // product.images.forEach(image => {
        //     fs.unlinkSync(path.join(__dirname, 'uploads', image));
        // });
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { addProduct, getSingleProduct, getAllProducts, updateProduct, deleteProduct }