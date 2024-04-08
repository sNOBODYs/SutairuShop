import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function WomenKimono(){
return(
    <>
    <section className ="page-header">
        <h1>Womens Kimonos</h1>
    </section>
    <ProductComponent category="women-kimono"/>
    <Footer />
    </>
)
}