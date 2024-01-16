import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  const[loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true)

      const response = await axios.post('http://localhost:8000/api/users', {
        fullName, email, password
      }, config)

      console.log(response.data)
      // localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      setFullName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
  
      setLoading(false);
  
    }

  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form className='w-25 shadow p-3' method='POST' onSubmit={submitHandler}>
      <div className="mb-3">
          <label htmlFor="exampleInputText1" class="form-label">Full Name</label>
          <input type="text" class="form-control" id="exampleInputText1" required
          name='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" class="form-label">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" required
          name='email'
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" required
          name='password'
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        <p className='form-text mt-3 text-center'>Already have an account <Link to="/signin">Sign In Here</Link></p>
      </form>
    </div>
  )
}

export default Signup