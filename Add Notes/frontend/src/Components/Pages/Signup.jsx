import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form className='w-25 shadow p-3'>
      <div class="mb-3">
          <label for="exampleInputText1" class="form-label">Full Name</label>
          <input type="text" class="form-control" id="exampleInputText1" required/>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input type="email" class="form-control" id="exampleInputEmail1" required/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" required/>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        <p className='form-text mt-3 text-center'>Already have an account <Link to="/signin">Sign In Here</Link></p>
      </form>
    </div>
  )
}

export default Signup