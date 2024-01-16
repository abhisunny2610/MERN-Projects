import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form className='w-25 shadow p-3'>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1"/>
            
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1"  aria-describedby="passwordHelp"  />
          <div id="passwordHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Sign In</button>
        <p className='form-text mt-3 text-center'>Don't have an account <Link to="/signup">Sign Up Here</Link></p>
      </form>
    </div>
  )
}

export default Signin