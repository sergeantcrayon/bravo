import React, { Fragment } from 'react';
import './Navbar.scss';
import Login from './Login';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <div className="bar-container">
        <div className="half-bar">
          <Link to={`/`}>
            <span className="nav-logo">Bravo</span>
          </Link>
          <Login />
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
