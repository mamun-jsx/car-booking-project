import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link
          to="/about-us"
          onClick={() => scrollTo(0, 0)}
          className="link link-hover hover:text-primary"
        >
          About Us
        </Link>

        <Link
          to="/contact-us"
          onClick={() => scrollTo(0, 0)}
          className="link link-hover hover:text-primary"
        >
          Contact Us
        </Link>
        <Link
          to="cars"
          onClick={() => scrollTo(0, 0)}
          className="link link-hover hover:text-primary"
        >
          Cars
        </Link>
        <Link
          to="/"
          onClick={() => scrollTo(0, 0)}
          className="link link-hover hover:text-primary"
        >
          Home
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to={`https://www.facebook.com/@mamunthegreat`}>
            <img src={assets.facebook_logo} alt="" />
          </Link>
          <Link to={`https://www.instagram.com/lord_mamun/`}>
            <img src={assets.instagram_logo} alt="" />
          </Link>
          <Link
            to={"mailto:mamun.jsx@gmail.com"}
            onClick={() =>
              (window.location.href = "mailto:mamun.jsx@gmail.com")
            }
          >
            <img src={assets.gmail_logo} alt="Email me" />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          <Link
            className="ml-2 underline text-primary"
            to={`https://github.com/mamun-jsx`}
          >
            Abdullah Al Mamun
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
