import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    images: []
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price);
  imageFiles.forEach((file, index) => {
    formData.append('images', file);
  });

  try {
    await axios.post('/api/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/');
  } catch (error) {
    console.error('Error adding product:', error);
  }
};


  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Images</label>
          <input type="file" className="form-control" id="images" name="images" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
