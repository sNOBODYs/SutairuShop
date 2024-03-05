import React from 'react'; 
import NavBar from '../../components/NavBar.jsx';
import Footer from '../../components/FooterComponent.jsx';
import MobileMenu from '../../components/MobileMenu.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function MensShirts(){
return(
    <>
    <MobileMenu />
    <NavBar />
    <ProductComponent category="men-shirt"/>
    <h1>Mens Shirts Page</h1>
    <Footer />
    </>
)
}