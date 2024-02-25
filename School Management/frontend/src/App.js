import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminApplication from './Components/Admin/Pages/AdminApplication';
import LoginPage from './Components/Admin/Pages/loginpage';
import CommonLoginPage from './Components/Teacher/CommonLoginPage';

function App() {

  return (
    <div className="App">
      <AdminApplication />
    </div>
  );
}

export default App;
