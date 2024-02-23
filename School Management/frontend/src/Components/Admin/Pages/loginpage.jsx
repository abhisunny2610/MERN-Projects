import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../Redux/Slices/auth'

const LoginPage = () => {

  const [credentials, setCredentials] = useState({ email: "", role: "admin", password: "" })
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login(credentials))
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage