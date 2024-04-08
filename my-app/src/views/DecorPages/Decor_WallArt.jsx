import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function DecorWallArt(){
return(
    <>
     <section className ="page-header">
        <h1>Japanese Wall Art</h1>
    </section>
    <ProductComponent category="decor-wallart"/>
    <Footer />
    </>
)
}