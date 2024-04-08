import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function DecorNeko(){
return(
    <>
    <section className ="page-header">
        <h1>Maneki Neko</h1>
    </section>
    <ProductComponent category="decor-neko"/>
    <Footer />
    </>
)
}