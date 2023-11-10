import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
function Nav(props) {
  const [isShow, setIsShow] = useState(true);
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsShow(false);
    }
  }, []);
  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/users">User</NavLink>
          <NavLink to="/projeacts">Projeacts</NavLink>
        </div>
      )}
    </>
  );
}

export default Nav;
