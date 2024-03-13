import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function MensHoodie(){
return(
    <>
    <section className ="page-header">
        <h1>Mens Hoodies</h1>
    </section>
    <ProductComponent category="men-hoodie"/>
    <Footer />
    </>
)
}