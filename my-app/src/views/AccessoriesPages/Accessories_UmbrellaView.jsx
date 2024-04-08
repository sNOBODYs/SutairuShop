import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function AccessoriesUmbrella(){
return(
    <>
    <section className ="page-header">
        <h1>Japanese Umbrellas</h1>
    </section>
    <ProductComponent category="accessories-umbrellas"/>
    <Footer />
    </>
)
}