import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/product/${id}`);
                setProduct(response.data);
                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/product/${id}`, formData);
            navigate("/")
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
