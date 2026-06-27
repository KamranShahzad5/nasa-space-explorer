import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__text">
          🚀 NASA Space Explorer — Built with React + TypeScript
        </p>
        <p className="footer__credit">
          Data provided by{' '}
          <a href="https://api.nasa.gov" target="_blank" rel="noreferrer" className="footer__link">
            NASA Open APIs
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
