import React from 'react';
import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <p className="footer-p">Powered by <a href="https://darksky.net/poweredby/" target="_blank">Dark Sky</a>, <a href="https://history.muffinlabs.com/" target="_blank">History@Muffinlabs</a>, and <a href="http://numbersapi.com/" target="_blank">NumbersAPI</a></p>
    </footer>
  );
}

export default Footer;