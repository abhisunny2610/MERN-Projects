import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Screens/Navbar';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './Components/Screens/Products';
import AddProduct from './Components/Screens/AddProduct';
import UpdateProduct from './Components/Screens/UpdateProduct';

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/add-product" element={<AddProduct />}></Route>
        <Route path="/update-product/:id" element={<UpdateProduct />}></Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="d-flex">
          <Navbar />
          <div className="content mx-2">
            <Routing />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
