import React from 'react';
import '../styles/FooterComponent.css'

function FooterComponent()
{
    return(
        <footer>
        <div className="footer-container">
          <p>&copy; 2024 Satairu. All rights reserved.</p>
          <ul>
            <li><a>Home</a></li>
            <li><a>About</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
          </footer>
    );
}
export default FooterComponent;