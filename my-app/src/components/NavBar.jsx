import React from 'react'; // Make sure to import React if you haven't already
import NavBar from './styles/NavBar.css';


export default function NavBar() {
    return (
        <header>
            <a href="/home" className="logo"><img src="videoAndImage/variant5.png" height="65" alt="Sutairu" /></a>
            <ul className="menu1">
                <li className="men">
                    <a>Men</a>
                    <ul className="men-submenu">
                        <li className="men-submenu-item"><a href="/mens-kimono">Japanese Kimono</a></li>
                        <li className="men-submenu-item"><a href="/mens-kimono-jackets">Japanese Kimono Jackets</a></li>
                        <li className="men-submenu-item"><a href="/mens-hoodie">Japanese Hoodie</a></li>
                        <li className="men-submenu-item"><a href="/mens-shirts">Japanese Shirts</a></li>
                        <li className="men-submenu-item"><a href="/geta">Japanese Geta</a></li>
                    </ul>
                </li>
                <li className="women">
                    <a>Women</a>
                    <ul className="women-submenu">
                        <li className="women-submenu-item"><a href="/women-kimono">Japanese Kimono</a></li>
                        <li className="women-submenu-item"><a href="/women-dress">Japanese Dress</a></li>
                        <li className="women-submenu-item"><a href="/women-pajamas">Japanese Pajamas</a></li>
                    </ul>
                </li>
                <li className="accessories">
                    <a>Accessories</a>
                    <ul className="accessories-submenu">
                        <li className="accessories-submenu-item"><a href="/accessories-masks">Japanese Mask</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories-umbrella">Japanese Umbrella</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories-fan">Japanese Fan</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories-obi-belt">Obi Belt</a></li>
                    </ul>
                </li>
                <li className="decor">
                    <a>Decor</a>
                    <ul className="decor-submenu">
                        <li className="decor-submenu-item"><a href="/decor-wall-art">Japanese Wall Art</a></li>
                        <li className="decor-submenu-item"><a href="/decor-stationery">Japanese Stationery</a></li>
                        <li className="decor-submenu-item"><a href="/decor-noren">Japanese Noren</a></li>
                        <li className="decor-submenu-item"><a href="/decor-neko">Maneki Neko</a></li>
                    </ul>
                </li>
            </ul>

            <div className="menu2">
                <a id="logIn" href="/login"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }}></i></a>
                <a id="logOut" onClick={loggedOut}>Log out</a> {/* Make sure loggedOut is a function */}
                <a id="cart" href="/cart"><i className="fa-solid fa-cart-shopping fa-xl" style={{ color: '#000000' }}></i></a>
            </div>

            <div className="menu-icon"><a><i className="fa-solid fa-bars fa-2xl" style={{ color: '#000000' }}></i></a></div>
        </header>
    );
}

function loggedOut() {
    // Function logic for logout
}
