import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/productComponents/ProductComponentNoSize.jsx';

export default function DecorStationery(){
return(
    <>
    <section className ="page-header">
        <h1>Japanese Stationery</h1>
    </section>
    <ProductComponent category="decor-stationery"/>
    <Footer />
    </>
)
}