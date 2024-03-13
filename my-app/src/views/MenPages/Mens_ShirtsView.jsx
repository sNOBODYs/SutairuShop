import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';
import '../../styles/ProductsPage.css';
export default function MensShirts(){
return(
    <>
    <section className ="page-header">
        <h1>Mens Shirts</h1>
    </section>
    <ProductComponent category="men-shirt"/>
    <Footer />
    </>
)
}