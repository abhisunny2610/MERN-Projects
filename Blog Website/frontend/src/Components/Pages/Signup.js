import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {


  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)


  const submitHandler = async(e)=> {
    e.preventDeafult()
  }

  return (
    <div className='signup vh-100 d-flex align-items-center justify-content-center'>
      <form className='w-25 shadow-lg p-3' onSubmit={submitHandler}>
        <h4 className='text-center text-light'>Sign Un Here</h4>
        <hr className='text-light' />
        <div className="mb-3">
          <label htmlFor="exampleInputText1" className="form-label text-light">Name</label>
          <input type="text" className="form-control" id="exampleInputText1" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-light">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text text-light">We'll never share your password with anyone else.</div>
        </div>
        <button type="submit" className="btn w-100 btn-primary">Submit</button>
        <p className='text-center text-light mt-3'>Already have an account <Link to='/signin'>Signin Here</Link></p>
      </form>
    </div>
  )
}

export default Signup