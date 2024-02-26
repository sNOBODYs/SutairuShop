import '../styles/MobileMenu.css'
import React, { useEffect } from 'react';

function MobileMenu() {
  useEffect(() => {
    const menuIcon = document.querySelector(".menu-icon");
    const menClick = document.querySelector(".click-men");
    const womenClick = document.querySelector(".click-women");
    const accessoriesClick = document.querySelector(".click-accessories");
    const decorClick = document.querySelector(".click-decor");
    const closeArrowMen = document.querySelector(".close-arrow-men");
    const closeArrowWomen = document.querySelector(".close-arrow-women");
    const closeArrowAccessories = document.querySelector(".close-arrow-accessories");
    const closeArrowDecor = document.querySelector(".close-arrow-decor");
    const navLinks = document.querySelector(".menu1-bar");
    const navLinksMen = document.querySelector(".menu1-bar-men");
    const navLinksWomen = document.querySelector(".menu1-bar-women");
    const navLinksAccessories = document.querySelector(".menu1-bar-accessories");
    const navLinksDecor = document.querySelector(".menu1-bar-decor");

    const handleClickIcon = () => {
      navLinks.classList.toggle('mobile-menu');
    };
    menuIcon.addEventListener('click', handleClickIcon);

    const handleClickMen = () => {
      navLinksMen.classList.toggle('mobile-menu');
    };
    menClick.addEventListener('click', handleClickMen);

    const handleClickWomen = () => {
      navLinksWomen.classList.toggle('mobile-menu');
    };
    womenClick.addEventListener('click', handleClickWomen);

    const handleClickAccessories = () => {
      navLinksAccessories.classList.toggle('mobile-menu');
    };
    accessoriesClick.addEventListener('click', handleClickAccessories);

    const handleClickDecor = () => {
      navLinksDecor.classList.toggle('mobile-menu');
    };
    decorClick.addEventListener('click', handleClickDecor);

    const handleClickCloseArrowMen = () => {
      navLinksMen.classList.toggle('mobile-menu');
    };
    closeArrowMen.addEventListener('click', handleClickCloseArrowMen);

    const handleClickCloseArrowWomen = () => {
      navLinksWomen.classList.toggle('mobile-menu');
    };
    closeArrowWomen.addEventListener('click', handleClickCloseArrowWomen);

    const handleClickCloseArrowAccessories = () => {
      navLinksAccessories.classList.toggle('mobile-menu');
    };
    closeArrowAccessories.addEventListener('click', handleClickCloseArrowAccessories);

    const handleClickCloseArrowDecor = () => {
      navLinksDecor.classList.toggle('mobile-menu');
    };
    closeArrowDecor.addEventListener('click', handleClickCloseArrowDecor);

    // Cleanup event listeners on component unmount
    return () => {
      menuIcon.removeEventListener('click', handleClickIcon);
      menClick.removeEventListener('click', handleClickMen);
      womenClick.removeEventListener('click', handleClickWomen);
      accessoriesClick.removeEventListener('click', handleClickAccessories);
      decorClick.removeEventListener('click', handleClickDecor);
      closeArrowMen.removeEventListener('click', handleClickCloseArrowMen);
      closeArrowWomen.removeEventListener('click', handleClickCloseArrowWomen);
      closeArrowAccessories.removeEventListener('click', handleClickCloseArrowAccessories);
      closeArrowDecor.removeEventListener('click', handleClickCloseArrowDecor);
    };
  }, []); // empty dependency array ensures the effect runs only once after initial render


  return (
    <>
       <div className ="menu1-bar">
    <ul>
    <li><a className="click-men">Men</a></li>
    <li><a className="click-women">Women</a></li>
    <li><a className="click-accessories">Accessories</a></li>
    <li><a className="click-decor">Decor</a></li>
    <li><a className="click-men">Login/Register</a></li>
    </ul>
</div>
<div className ="menu1-bar-men">
    <div className="close-arrow-men"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/men/kimonos'>Japanese Kimono</a></li>
    <li><a href='/men/kimono-jackets'>Japanese Kimono Jacket</a></li>
    <li><a href='/men/hoodies'>Japanese Hoodie</a></li>
    <li><a href='/men/shirts'>Japanese Shirt</a></li>
    <li><a href='/men/geta'>Japanese Geta</a></li>
    </ul>
</div>
<div className ="menu1-bar-women">
<div className="close-arrow-women"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/women/kimonos'>Japanese Kimono</a></li>
    <li><a href='/women/dresses'>Japanese Dress</a></li>
    <li><a href='/women/pajamas'>Japanese Pajamas</a></li>
    </ul>
</div>
<div className ="menu1-bar-accessories">
<div className="close-arrow-accessories"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/accessories/masks'>Japanese Mask</a></li>
    <li><a href='/accessories/umbrellas'>Japanese Umbrella</a></li>
    <li><a href='/accessories/fans'>Japanese Fan</a></li>
    <li><a href='/accessories/obi-belts'>Obi Belt</a></li>
    </ul>
</div>
<div className ="menu1-bar-decor">
<div className="close-arrow-decor"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/decor/wall-art'>Japanese Wall Art</a></li>
    <li><a href='/decor/stationery'>Japanse Stationery</a></li>
    <li><a href='/decor/noren'>Japanese Noren</a></li>
    <li><a href='/decor/neko'>Maneki Neko</a></li>
    </ul>
</div>
    </>
  );
}
export default MobileMenu;