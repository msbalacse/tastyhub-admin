import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/TastyHub_bw.png";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="logo">
        <img src={Logo} alt="logo__image" />
      </div>
      <div className="nav__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/notification">Notification</NavLink>
        <NavLink to="/manage">Manage</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
