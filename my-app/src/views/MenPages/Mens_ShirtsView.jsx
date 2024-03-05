import React from 'react'; 
import NavBar from '../../components/NavBar.jsx';
import Footer from '../../components/FooterComponent.jsx';
import MobileMenu from '../../components/MobileMenu.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';
import '../../styles/ProductsPage.css';
export default function MensShirts(){
return(
    <>
    <MobileMenu />
    <NavBar />
    <section className ="page-header">
        <h1>Mens Shirts</h1>
    </section>
    <ProductComponent category="men-shirt"/>
    <Footer />
    </>
)
}