import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <img
        src="/images/rainbow.png"
        alt="logo"
        style={{ width: "30px", margin: "5px"}}/> Herhobs
      <p>
        <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
