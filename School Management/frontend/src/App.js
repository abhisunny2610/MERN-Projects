import './App.css';
import Dashboard from './Components/Admin/Pages/Dashboard';
import LoginPage from './Components/Admin/Pages/loginpage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const { user, token } = useSelector((state) => state.auth);

  console.log("User",user, "token",token)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/adminlogin" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/adminlogin" replace />}
          />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
