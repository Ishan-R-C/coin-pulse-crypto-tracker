import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Crypto Dashboard · Built with human misery.</p>
      <p>© {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
