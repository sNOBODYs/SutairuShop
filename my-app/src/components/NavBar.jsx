import React, { useEffect, useState } from 'react';
import '../styles/NavBarStyle.css'
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { useSelector } from 'react-redux';
import CartShowComponent from './cartShowComponent';



function NavBarComponent() {
    const { currentUser } = useSelector((state) => state.user);
    const currentCart = useSelector((state) => state.cart.currentCart);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

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
        const storage = getStorage();
        const sutairuIconRef = ref(storage, 'mainPage/variant5.png');

        getDownloadURL(sutairuIconRef)
            .then((url) => {
                const sutairuIconElement = document.getElementById('logo');
                sutairuIconElement.src = url;
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className={hasScrolled ? 'scrolled' : ''}>
            <a href="/" className="logo"><img id='logo' height="65" alt="Sutairu" /></a>
            <ul className="menu1">
                <li className="men">
                    <a className='navtext-men'>Men</a>
                    <ul className="men-submenu">
                        <li className="men-submenu-item"><a href="/men/kimono">Japanese Kimono</a></li>
                        <li className="men-submenu-item"><a href="/men/jackets">Japanese Kimono Jackets</a></li>
                        <li className="men-submenu-item"><a href="/men/hoodie">Japanese Hoodie</a></li>
                        <li className="men-submenu-item"><a href="/men/shirt">Japanese Shirts</a></li>
                        <li className="men-submenu-item"><a href="/men/geta">Japanese Geta</a></li>
                    </ul>
                </li>
                <li className="women">
                    <a className='navtext-women'>Women</a>
                    <ul className="women-submenu">
                        <li className="women-submenu-item"><a href="/women/kimono">Japanese Kimono</a></li>
                        <li className="women-submenu-item"><a href="/women/dress">Japanese Dress</a></li>
                        <li className="women-submenu-item"><a href="/women/pijamas">Japanese Pajamas</a></li>
                    </ul>
                </li>
                <li className="accessories">
                    <a className='navtext-accessories'>Accessories</a>
                    <ul className="accessories-submenu">
                        <li className="accessories-submenu-item"><a href="/accessories/masks">Japanese Mask</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories/umbrellas">Japanese Umbrella</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories/fans">Japanese Fan</a></li>
                        <li className="accessories-submenu-item"><a href="/accessories/obibelts">Obi Belt</a></li>
                    </ul>
                </li>
                <li className="decor">
                    <a className='navtext-decor'>Decor</a>
                    <ul className="decor-submenu">
                        <li className="decor-submenu-item"><a href="/decor/wallart">Japanese Wall Art</a></li>
                        <li className="decor-submenu-item"><a href="/decor/stationery">Japanese Stationery</a></li>
                        <li className="decor-submenu-item"><a href="/decor/noren">Japanese Noren</a></li>
                        <li className="decor-submenu-item"><a href="/decor/neko">Maneki Neko</a></li>
                    </ul>
                </li>
            </ul>

            <div className="menu2">
                {currentUser ? (
                    <>
                         <div className='nav-cart' onClick={handleCartClick}>
                            <div id="cart"><i className="fa-solid fa-cart-shopping fa-xl" style={{ color: '#000000' }}></i></div>
                            <div className='cart-quantity'>{cartQuantity}</div>
                        </div>
                        <div className='nav-account'>
                            <a href="/account"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }}></i></a>
                        </div>
                    </>
                ) : (
                    <a id="logIn" href="/signup"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }}></i></a>
                )}
            </div>

            <div className="menu-icon"><div><i className="fa-solid fa-bars fa-2xl" style={{ color: '#000000' }}></i></div></div>
            <CartShowComponent isOpen={isCartOpen} onClose={handleCloseCart} />
        </header>
    );
}
export default NavBarComponent;
