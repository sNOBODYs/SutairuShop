import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';


export default function AccessoriesMask(){
return(
    <>
    <section className ="page-header">
        <h1>Japanese Mask</h1>
    </section>
    <ProductComponent category="accessories-masks"/>
    <Footer />
    </>
)
}