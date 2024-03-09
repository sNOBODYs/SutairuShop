import React, {useEffect} from 'react'; // Make sure to import React if you haven't already
import '../styles/NavBarStyle.css'
import firebaseConfig from '../config/firebase.js';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import app from '../config/firebase.js'

const storage = getStorage();
const storageRef = ref(storage);
const sutairuIconRef = ref(storage, 'mainPage/variant5.png')

getDownloadURL(sutairuIconRef)
.then((url) => {
    const sutairuIconElement = document.getElementById('logo');
    sutairuIconElement.src = url;
  })
  .catch((error) => {
    console.error(error);
  });


 function NavBarComponent() {
    useEffect(() =>{
        getDownloadURL(sutairuIconRef)
.then((url) => {
    const sutairuIconElement = document.getElementById('logo');
    sutairuIconElement.src = url;
  })
  .catch((error) => {
    console.error(error);
  });
    });
    return (
        <header>
            <a href="/sutairu" className="logo"><img id='logo' height="65" alt="Sutairu" /></a>
            <ul className="menu1">
                <li className="men">
                    <a className='navtext-men'>Men</a>
                    <ul className="men-submenu">
                        <li className="men-submenu-item"><a href="/men/kimonos">Japanese Kimono</a></li>
                        <li className="men-submenu-item"><a href="/men/kimono-jackets">Japanese Kimono Jackets</a></li>
                        <li className="men-submenu-item"><a href="/men/hoodies">Japanese Hoodie</a></li>
                        <li className="men-submenu-item"><a href="/men/shirts">Japanese Shirts</a></li>
                        <li className="men-submenu-item"><a href="/men/geta">Japanese Geta</a></li>
                    </ul>
                </li>
                <li className="women">
                    <a className='navtext-women'>Women</a>
                    <ul className="women-submenu">
                        <li className="women-submenu-item"><a href="/women/kimonos">Japanese Kimono</a></li>
                        <li className="women-submenu-item"><a href="/women/dresses">Japanese Dress</a></li>
                        <li className="women-submenu-item"><a href="/women/pajamas">Japanese Pajamas</a></li>
                    </ul>
                </li>
                <li className="accessories">
                    <a className='navtext-accessories'>Accessories</a>
                    <ul className="accessories-submenu">
                        <li className="accessories-submenu-item"><a href="/accessories/masks">Japanese Mask</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories/umbrellas">Japanese Umbrella</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories/fans">Japanese Fan</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories/obi-belts">Obi Belt</a></li>
                    </ul>
                </li>
                <li className="decor">
                    <a className='navtext-decor'>Decor</a>
                    <ul className="decor-submenu">
                        <li className="decor-submenu-item"><a href="/decor/wall-art">Japanese Wall Art</a></li>
                        <li className="decor-submenu-item"><a href="/decor/stationery">Japanese Stationery</a></li>
                        <li className="decor-submenu-item"><a href="/decor/noren">Japanese Noren</a></li>
                        <li className="decor-submenu-item"><a href="/decor/neko">Maneki Neko</a></li>
                    </ul>
                </li>
            </ul>

            <div className="menu2">
                <a id="logIn" href="/signup"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }}></i></a>
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

export default NavBarComponent;
