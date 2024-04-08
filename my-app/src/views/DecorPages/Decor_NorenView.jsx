import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponent.jsx';

export default function DecorNoren(){
return(
    <>
    <section className ="page-header">
        <h1>Japanese Noren</h1>
    </section>
    <ProductComponent category="decor-noren"/>
    <Footer />
    </>
)
}