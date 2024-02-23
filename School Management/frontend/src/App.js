import './App.css';
import Dashboard from './Components/Admin/Pages/Dashboard';
import LoginPage from './Components/Admin/Pages/loginpage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);
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
