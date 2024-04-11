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
            <li><Link to={'/'}><a>Home</a></Link></li>
            <li><Link to={'/about-us'}><a>About</a></Link></li>
            <li><Link to={'/contact-us'}><a>Contact</a></Link></li>
          </ul>
        </div>
          </footer>
    );
}
export default FooterComponent;