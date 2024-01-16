import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar bg-dark navbar-expand-lg border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                
                <NavLink className="navbar-brand" to="/">Add Notes</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex" role="login">
                        <Link to="/signup" className='btn btn-md '>Signup</Link>
                        <Link to="/signin" className='btn btn-md'>Signin</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header