import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="sidebar">
      <h2>Product CRUD</h2>
      <ul className="list-unstyled">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
