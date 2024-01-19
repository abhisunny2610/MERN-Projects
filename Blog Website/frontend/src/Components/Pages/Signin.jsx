import React from 'react'
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <div className='signin vh-100 d-flex align-items-center justify-content-center'>
            <form className='w-25 shadow-lg p-3'>
                <h4 className='text-center text-secondary'>Sign In Here</h4>
                <hr />
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" aria-describedby="emailHelp" required />
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                </div>
                <button type="submit" className="btn w-100 btn-primary">Sign In</button>
                <p className='text-center mt-3'>Don't have an account <Link to='/signup'>Signup Here</Link></p>
            </form>
        </div>
    )
}

export default Signin