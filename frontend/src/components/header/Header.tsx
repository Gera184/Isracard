import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { username, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <span>Welcome, {username}</span>
        </div>
        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
