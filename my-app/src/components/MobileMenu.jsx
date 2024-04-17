import '../styles/MobileMenu.css'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartShowComponent from './cartShowComponent';

function MobileMenu() {
  const currentCart = useSelector((state) => state.cart.currentCart);
  const { currentUser } = useSelector((state) => state.user);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
    document.body.style.overflow = 'hidden';
};
const handleCloseCart = () => {
  setIsCartOpen(false);
  document.body.style.overflow = 'auto'; 
};

  useEffect(() => {
    if (currentCart && currentCart.cart && currentCart.cart.products) {
        const newCartQuantity = currentCart.cart.products.reduce((totalQuantity, product) => {
            return totalQuantity + product.productQuantity;
        }, 0);
        setCartQuantity(newCartQuantity);
    } else if (currentCart && currentCart.cart) {
        const newCartQuantity = currentCart.cart.reduce((totalQuantity, product) => {
            return totalQuantity + product.productQuantity;
        },0);
        setCartQuantity(newCartQuantity);
    }else if (currentCart !== null || currentCart !== undefined) {
        setCartQuantity(0);
    }
}, [currentCart, currentUser]);

  useEffect(() => {
    const body = document.querySelector('body');
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.menu1-bar');

    const handleClickIcon = () => {
      navLinks.classList.toggle('mobile-menu');
      body.classList.toggle('no-scroll');
    };

    menuIcon.addEventListener('click', handleClickIcon);

    return () => {
      menuIcon.removeEventListener('click', handleClickIcon);
    };
  }, []);


  useEffect(() => {
    const menClick = document.querySelector(".click-men");
    const womenClick = document.querySelector(".click-women");
    const accessoriesClick = document.querySelector(".click-accessories");
    const decorClick = document.querySelector(".click-decor");
    const closeArrowMen = document.querySelector(".close-arrow-men");
    const closeArrowWomen = document.querySelector(".close-arrow-women");
    const closeArrowAccessories = document.querySelector(".close-arrow-accessories");
    const closeArrowDecor = document.querySelector(".close-arrow-decor");
    const navLinksMen = document.querySelector(".menu1-bar-men");
    const navLinksWomen = document.querySelector(".menu1-bar-women");
    const navLinksAccessories = document.querySelector(".menu1-bar-accessories");
    const navLinksDecor = document.querySelector(".menu1-bar-decor");

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

    return () => {
      menClick.removeEventListener('click', handleClickMen);
      womenClick.removeEventListener('click', handleClickWomen);
      accessoriesClick.removeEventListener('click', handleClickAccessories);
      decorClick.removeEventListener('click', handleClickDecor);
      closeArrowMen.removeEventListener('click', handleClickCloseArrowMen);
      closeArrowWomen.removeEventListener('click', handleClickCloseArrowWomen);
      closeArrowAccessories.removeEventListener('click', handleClickCloseArrowAccessories);
      closeArrowDecor.removeEventListener('click', handleClickCloseArrowDecor);
    };
  }, []);
  

  return (
    <div>
       <div className ="menu1-bar">
    <ul>
    <li><div className="click-men">Men</div></li>
    <li><div className="click-women">Women</div></li>
    <li><div className="click-accessories">Accessories</div></li>
    <li><div className="click-decor">Decor</div></li>
    {currentUser ? (
      <ul>
      <li ><a href="/account" className="click-profile">Profile</a></li>
      <li><div className="click-cart"onClick={handleCartClick}>Cart</div>
      <div className='cart-quantity-mobile'>{cartQuantity}</div>
      </li>
      
      </ul>
      ) : (
        <li><a href="/signup" className="click-men">Login/Register</a></li>
      )}
    </ul>
</div>
<div className ="menu1-bar-men">
    <div className="close-arrow-men"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/men/kimono'>Japanese Kimono</a></li>
    <li><a href='/men/jackets'>Japanese Kimono Jacket</a></li>
    <li><a href='/men/hoodie'>Japanese Hoodie</a></li>
    <li><a href='/men/shirt'>Japanese Shirt</a></li>
    <li><a href='/men/geta'>Japanese Geta</a></li>
    </ul>
</div>
<div className ="menu1-bar-women">
<div className="close-arrow-women"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/women/kimono'>Japanese Kimono</a></li>
    <li><a href='/women/dress'>Japanese Dress</a></li>
    <li><a href='/women/pijamas'>Japanese Pajamas</a></li>
    </ul>
</div>
<div className ="menu1-bar-accessories">
<div className="close-arrow-accessories"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/accessories/masks'>Japanese Mask</a></li>
    <li><a href='/accessories/umbrellas'>Japanese Umbrella</a></li>
    <li><a href='/accessories/fans'>Japanese Fan</a></li>
    <li><a href='/accessories/obibelts'>Obi Belt</a></li>
    </ul>
</div>
<div className ="menu1-bar-decor">
<div className="close-arrow-decor"><i className="fa-solid fa-caret-left fa-2xl" style={{ color: '#000000' }}></i></div>
    <ul>
    <li><a href='/decor/wallart'>Japanese Wall Art</a></li>
    <li><a href='/decor/stationery'>Japanse Stationery</a></li>
    <li><a href='/decor/noren'>Japanese Noren</a></li>
    <li><a href='/decor/neko'>Maneki Neko</a></li>
    </ul>
</div>
<CartShowComponent isOpen={isCartOpen} onClose={handleCloseCart} />
    </div>
  );
}
export default MobileMenu;