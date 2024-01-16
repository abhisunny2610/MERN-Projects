import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true)

      const response = await axios.post('localhost:8000/api/users/signin', {
        email, password
      }, config)

      console.log(response)
      // localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      setPassword("")
      setEmail("")
      
    } catch (error) {
      setError(error.response.data.message)
    }

  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form className='w-25 shadow p-3' onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"
            value={email} name='email'
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp"
            value={password} name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        <p className='form-text mt-3 text-center'>Don't have an account <Link to="/signup">Sign Up Here</Link></p>
      </form>
    </div>
  )
}

export default Signin