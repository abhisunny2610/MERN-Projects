import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const showSuccessAlert = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000); // Hide after 5 seconds 
  };

  const showErrorAlert = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000); // Hide after 5 seconds
  };

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      }

      const response = await axios.post('http://localhost:8001/api/auth/signup', {
        name: formData.name, email: formData.email, password: formData.password
      }, config)

      showSuccessAlert('User successfully created')
      clearForm()

      setTimeout(() => {
        navigate('/signin')
      }, 100)

    } catch (error) {
      showErrorAlert('Error creating user');
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <div className='signup vh-100 d-flex align-items-center justify-content-center'>
        {errorMessage && <div className="popup-error m-3 position-fixed top-0 end-0" role="alert">{errorMessage}</div>}
        {successMessage && <div className="popup-success m-3 position-fixed top-0 end-0" role="alert">{successMessage}</div>}
        <form className='w-25 shadow-lg p-3' onSubmit={submitHandler} method='POST'>
          <h4 className='text-center text-light'>Sign Un Here</h4>
          <hr className='text-light' />
          <div className="mb-3">
            <label htmlFor="exampleInputText1" className="form-label text-light">Name</label>
            <input type="text" className="form-control" id="exampleInputText1"
              name='name'
              value={formData.name}
              onChange={handleChange}
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-light">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1"
              name='email'
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp"
              name='password'
              value={formData.password}
              onChange={handleChange}
              required />
            <div id="emailHelp" className="form-text text-light">We'll never share your password with anyone else.</div>
          </div>
          <button type="submit" className="btn w-100 btn-primary" disabled={loading}>{loading ? (<div className="spinner-border spinner-border-md" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>) : 'Sign Up'}</button>
          <p className='text-center text-light mt-3'>Already have an account <Link to='/signin'>Signin Here</Link></p>
        </form>
      </div>
    </>
  )
}

export default Signup