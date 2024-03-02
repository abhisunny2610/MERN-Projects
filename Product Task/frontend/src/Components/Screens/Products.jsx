import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/product/${id}`)
      fetchProducts()
    } catch (error) {
      console.error("Error delete product", error)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const searchValue = searchInput.toLowerCase().trim(); 
    return (
      product.name.toLowerCase().includes(searchValue) || 
      product.category.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div>
      <h2>Product List</h2>
      <div className='d-flex'>
        <input type="text" placeholder='Search by category' className='form-control mb-3 mx-2 w-25' value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      </div>
      <ul className='d-flex flex-wrap'>
        {filteredProducts?.map(product => (
          <div key={product?._id} className="card mx-2" style={{ width: '18rem' }}>

            {product?.images?.map(image =>
              (<img src={image} className="card-img-top" alt={product?.name} />))}
            <div className="card-body">
              <h5 className="card-title">{product?.name}</h5>
              <p className="card-text">{product?.description}</p>
              <p className="card-text">Rs. {product?.price}</p>
              <Link className='btn btn-sm btn-warning' to={`/update-product/${product?._id}`}>Edit</Link>
              <button className='btn btn-sm btn-danger mx-2' onClick={() => deleteProduct(product?._id)}>Delete</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Products;
