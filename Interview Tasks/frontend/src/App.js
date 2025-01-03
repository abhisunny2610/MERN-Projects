import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Task1 from './Components/Task1';
import Task2 from './Components/Task2';
import Task3 from './Components/Task3';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Task1 />} />
          <Route path="/task2" element={<Task2 />} />
          <Route path="/task3" element={<Task3 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
