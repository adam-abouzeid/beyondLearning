import "./Footer.css";
import { Link } from "react-router-dom";
import { AiOutlineInstagram } from "react-icons/ai";
import { TbBrandTiktok } from "react-icons/tb";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="header-footer">
        <h4 className="footer-logo">OCTANE</h4>
      </div>
      <hr />
      <div className="footer-links flex">
        <div className="link-group">
          <p className="group-title-footer">Account</p>
          <ul>
            <li>
              <Link to="/login" className="link-footer">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="link-footer">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        <div className="link-group">
          <p className="group-title-footer">Discover</p>
          <ul>
            <li>
              <Link className="link-footer">Buy</Link>
            </li>
            <li>
              <Link className="link-footer">Sell</Link>
            </li>
            <li>
              <Link className="link-footer">Ask</Link>
            </li>
            <li>
              <Link className="link-footer">Brands</Link>
            </li>
            <li>
              <Link className="link-footer">Dealers</Link>
            </li>
          </ul>
        </div>
        <div className="link-group">
          <p className="group-title-footer">Support</p>
          <ul>
            <li>
              <Link className="link-footer">Help & Customer Support</Link>
            </li>
            <li>
              <Link className="link-footer">Contact Us</Link>
            </li>
            <li>
              <Link className="link-footer">About Us</Link>
            </li>
            <li>
              <Link className="link-footer">Send Feedback</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="social-links">
        <div className="social-media">
          <h3>FOLLOW US</h3>
          <div className="social-media-icons">
            <Link>
              <SlSocialFacebook />
            </Link>
            <Link>
              <AiOutlineInstagram />
            </Link>
            <Link>
              <TbBrandTiktok />
            </Link>
            <Link>
              <TfiTwitter />
            </Link>
          </div>
        </div>
        <div className="store-links">
          <Link>
            <img
              className="store-link-image"
              src="https://secure.meetupstatic.com/next/images/app-download/android/download_en-US.svg?w=256"
              alt="Get it on google playstore"
            />
          </Link>
          <Link>
            <img
              className="store-link-image"
              src="https://secure.meetupstatic.com/next/images/app-download/ios/download_en-US.svg?w=256"
              alt="Get it on app store"
            />
          </Link>
        </div>
      </div>
      <div className="legal">
        <p className="copyright">
          &copy; {currentYear} OCTANE MIDDLE EAST. ALL RIGHTS RESERVED.
        </p>
        <div className="legal-links">
          <Link>Cookie Settings</Link>
          <Link>Cookie Policy</Link>
          <Link>Privacy Policy</Link>
          <Link>Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
