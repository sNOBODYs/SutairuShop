import React from 'react'; 
import NavBar from '../../components/NavBar.jsx';
import Footer from '../../components/FooterComponent.jsx';
import MobileMenu from '../../components/MobileMenu.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function MensGeta(){
return(
    <>
    <MobileMenu />
    <NavBar />
    <section className ="page-header">
        <h1>Mens Getas</h1>
    </section>
    <ProductComponent category="men-geta"/>
    <Footer />
    </>
)
}