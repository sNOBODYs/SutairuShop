import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function MensGeta(){
return(
    <>
    <section className ="page-header">
        <h1>Mens Getas</h1>
    </section>
    <ProductComponent category="men-geta"/>
    <Footer />
    </>
)
}