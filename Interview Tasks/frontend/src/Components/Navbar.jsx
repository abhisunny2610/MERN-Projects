import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4 justify-center">
        <li>
          <Link to="/" className="text-white hover:underline">
            Task 1
          </Link>
        </li>
        <li>
          <Link to="/task2" className="text-white hover:underline">
            Task 2
          </Link>
        </li>
        <li>
          <Link to="/task3" className="text-white hover:underline">
            Task 3
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
