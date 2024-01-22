import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const showErrorAlert = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    };

    const clearForm = () => {
        setFormData({
            email: '',
            password: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            setLoading(true)
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            }

            const response = await axios.post('http://localhost:8001/api/auth/signin', {
                email: formData.email, password: formData.password
            }, config)

            console.log(response.data)

            const token = response.data.token
            localStorage.setItem('authToken', token)

            setTimeout(() => {
                navigate('/')
            }, 1000)

            clearForm()

        } catch (error) {
            showErrorAlert('Invalid email or password');
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='signin vh-100 d-flex align-items-center justify-content-center'>
            <form className='w-25 shadow-lg p-3' method='POST' onSubmit={handleSubmit} disabled={loading}>
                {errorMessage && <div className="popup-error m-3 position-fixed top-0 end-0" role="alert">{errorMessage}</div>}
                <h4 className='text-center text-secondary'>Sign In Here</h4>
                <hr />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required />
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                </div>
                <button type="submit" className="btn w-100 btn-primary" disabled={loading}>{loading ? (<div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>) : 'Sign In'}</button>
                <p className='text-center mt-3'>Don't have an account <Link to='/signup'>Signup Here</Link></p>
            </form>
        </div>
    )
}

export default Signin