import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/FooterComponent.css'

function FooterComponent()
{
    return(
        <footer>
        <div className="footer-container">
          <p>&copy; 2024 Satairu. All rights reserved.</p>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/about-us'>About</a></li>
            <li><a href='/contact-us'>Contact</a></li>
          </ul>
        </div>
          </footer>
    );
}
export default FooterComponent;