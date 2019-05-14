import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header>
      <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
    </header>
  );
};

export default Header;
