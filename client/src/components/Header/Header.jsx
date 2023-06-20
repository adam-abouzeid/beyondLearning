import React, { useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import logoImage from "../../assets/beyondlearning-logo.png";
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavItems = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container center">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <img src={logoImage} alt="" />
          </Link>
        </div>
        <div className="">
          <ul className={`nav-links ${isNavOpen ? "active" : ""}`}>
            <button className="close-nav-mobile" onClick={toggleNavItems}>
              <AiOutlineClose />
            </button>
            <li onClick={closeNavMenu}>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navlink" : "")}
                to="/products"
              >
                Inventory
              </NavLink>
            </li>
            <li>
              {/* onClick={closeNavMenu} */}
              <NavLink
                style={{ width: "100%" }}
                className={({ isActive }) => (isActive ? "active-navlink" : "")}
                to="/createPost"
              >
                No Idea
              </NavLink>
            </li>
            <li onClick={closeNavMenu}>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navlink" : "")}
                to="/wanted"
              >
                Cart
              </NavLink>
            </li>

            <li onClick={closeNavMenu}>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navlink" : "")}
                to="/dealers"
              >
                Sign Up/Log In
              </NavLink>
            </li>
            {isNavOpen && (
              <div className="nav-store-links">
                <Link to="/">
                  <img
                    className="nav-store-link-image"
                    src="https://secure.meetupstatic.com/next/images/app-download/android/download_en-US.svg?w=256"
                    alt="Get it on Google Play Store"
                  />
                </Link>
                <Link to="/">
                  <img
                    className="nav-store-link-image"
                    src="https://secure.meetupstatic.com/next/images/app-download/ios/download_en-US.svg?w=256"
                    alt="Get it on App Store"
                  />
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
