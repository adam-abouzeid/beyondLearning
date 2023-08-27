import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import SearchBox from "../SearchBox";
import { resetCart } from "../../slices/cartSlice";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleNavItems = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavMenu = () => {
    setIsNavOpen(false);
  };
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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
            <SearchBox />
            <li onClick={closeNavMenu}>
              <NavLink
                className={({ isActive }) => (isActive ? "active-navlink" : "")}
                to="/products"
              >
                Storage Inventory
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
                to="/basket"
              >
                Basket{" "}
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </NavLink>
            </li>
            {userInfo ? (
              <div className="options">
                <button onClick={logoutHandler}>Logout</button>
                <Link to="/profile">Profile</Link>
              </div>
            ) : (
              <li onClick={closeNavMenu}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-navlink" : ""
                  }
                  to="/login"
                >
                  Sign Up/Log In
                </NavLink>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="admin-links">
                Admin Only:
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-navlink" : ""
                  }
                  to="/admin/productList"
                >
                  Products
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-navlink" : ""
                  }
                  to="/admin/orderList"
                >
                  Orders
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-navlink" : ""
                  }
                  to="/admin/userList"
                >
                  Users
                </NavLink>
              </div>
            )}
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
