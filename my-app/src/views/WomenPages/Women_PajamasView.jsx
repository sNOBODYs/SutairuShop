import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/productComponents/ProductComponent.jsx';

export default function WomenPajamas(){
return(
    <>
    <section className ="page-header">
        <h1>Japanese Pajamas</h1>
    </section>
    <ProductComponent category="women-pijamas"/>
    <Footer />
    </>
)
}