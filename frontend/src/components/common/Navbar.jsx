import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg">Home</Link>
        <div>
          {user ? (
            <>
              <span className="text-white mx-2">{user.name}</span>
              <button onClick={() => handleLogout(navigate)} className="text-white mx-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mx-2">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
