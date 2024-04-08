import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function WomenDress(){
return(
    <>
   <section className ="page-header">
        <h1>Womens Dresses</h1>
    </section>
    <ProductComponent category="women-dress"/>
    <Footer />
    </>
)
}