import "./Footer.style.css";
import React from "react";
import { Icon } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerSitemap">
        <h3>Site Map</h3>
        <a href="#home">Home</a>
        <a href="#account">Account</a>
        <a href="#wall">Wall</a>
        <a href="#logout">Log Out</a>
      </div>
      <div className="signature">
        <p>Tyra Club</p>
        <p>&copy; 2025</p>
      </div>
      <div className="socials footerSitemap">
        <h3>Social Media</h3>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FacebookOutlinedIcon />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <XIcon />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
