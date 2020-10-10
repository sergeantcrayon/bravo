import React, { Fragment } from 'react';
import './Navbar.scss';
import Login from './Login';

const Navbar = () => {
  return (
    <Fragment>
      <div className="bar-container">
        <div className="half-bar">
          <div className="nav-logo">Bravo</div>
          <Login />
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
