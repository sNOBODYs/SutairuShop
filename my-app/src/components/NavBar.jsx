import React, { useEffect, useState } from 'react';
import '../styles/NavBarStyle.css'
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { useSelector } from 'react-redux';
import CartShowComponent from './cartShowComponent';
import { Link } from 'react-router-dom';



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
            <Link to="/" className="logo"><img id='logo' height="65" alt="Sutairu" /></Link>
            <ul className="menu1">
                <li className="men">
                    <div className='navtext-men'>Men</div>
                    <ul className="men-submenu">
                        <li className="men-submenu-item"><Link to="/men/kimono">Japanese Kimono</Link></li>
                        <li className="men-submenu-item"><Link to="/men/jackets">Japanese Kimono Jackets</Link></li>
                        <li className="men-submenu-item"><Link to="/men/hoodie">Japanese Hoodie</Link></li>
                        <li className="men-submenu-item"><Link to="/men/shirt">Japanese Shirts</Link></li>
                        <li className="men-submenu-item"><Link to="/men/geta">Japanese Geta</Link></li>
                    </ul>
                </li>
                <li className="women">
                    <div className='navtext-women'>Women</div>
                    <ul className="women-submenu">
                        <li className="women-submenu-item"><Link to="/women/kimono">Japanese Kimono</Link></li>
                        <li className="women-submenu-item"><Link to="/women/dress">Japanese Dress</Link></li>
                        <li className="women-submenu-item"><Link to="/women/pijamas">Japanese Pajamas</Link></li>
                    </ul>
                </li>
                <li className="accessories">
                    <div className='navtext-accessories'>Accessories</div>
                    <ul className="accessories-submenu">
                        <li className="accessories-submenu-item"><Link to="/accessories/masks">Japanese Mask</Link></li>
                        <li className="accessories-submenu-item"><Link to="/accessories/umbrellas">Japanese Umbrella</Link></li>
                        <li className="accessories-submenu-item"><Link to="/accessories/fans">Japanese Fan</Link></li>
                        <li className="accessories-submenu-item"><Link to="/accessories/obibelts">Obi Belt</Link></li>
                    </ul>
                </li>
                <li className="decor">
                    <div className='navtext-decor'>Decor</div>
                    <ul className="decor-submenu">
                        <li className="decor-submenu-item"><Link to="/decor/wallart">Japanese Wall Art</Link></li>
                        <li className="decor-submenu-item"><Link to="/decor/stationery">Japanese Stationery</Link></li>
                        <li className="decor-submenu-item"><Link to="/decor/noren">Japanese Noren</Link></li>
                        <li className="decor-submenu-item"><Link to="/decor/neko">Maneki Neko</Link></li>
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
                            <Link to="/account"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }}></i></Link>
                        </div>
                    </>
                ) : (
                    <Link to="/signup" id="logIn"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }}></i></Link>
                )}
            </div>

            <div className="menu-icon"><div><i className="fa-solid fa-bars fa-2xl" style={{ color: '#000000' }}></i></div></div>
            <CartShowComponent isOpen={isCartOpen} onClose={handleCloseCart} />
        </header>
    );
}
export default NavBarComponent;
