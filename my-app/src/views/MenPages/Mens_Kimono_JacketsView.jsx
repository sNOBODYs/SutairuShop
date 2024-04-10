import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/productComponents/ProductComponent.jsx';

export default function MensKimonoJackets(){
return(
    <>
    <section className ="page-header">
        <h1>Mens Kimono Jackets</h1>
    </section>
    <ProductComponent category="men-jackets"/>
    <Footer />
    </>
)
}