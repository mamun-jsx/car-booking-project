import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded  p-10">
      <motion.nav
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.9 }}
        className="grid grid-flow-col gap-4"
      >
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
      </motion.nav>
      <motion.nav
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.9 }}
      >
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
      </motion.nav>
      <aside>
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.9 }}
        >
          Copyright © {new Date().getFullYear()} - All right reserved by
          <Link
            className="ml-2 underline text-primary"
            to={`https://github.com/mamun-jsx`}
          >
            Abdullah Al Mamun
          </Link>
        </motion.p>
      </aside>
    </footer>
  );
};

export default Footer;
