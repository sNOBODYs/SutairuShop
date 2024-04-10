import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/productComponents/ProductComponentNoSize.jsx';

export default function AccessoriesFan(){
return(
    <>
     <section className ="page-header">
        <h1>Fans</h1>
    </section>
    <ProductComponent category="accessories-fans"/>
    <Footer />
    </>
)
}