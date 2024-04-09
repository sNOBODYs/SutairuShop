import React from 'react'; 
import Footer from '../../components/FooterComponent.jsx';
import ProductComponent from '../../components/ProductComponentNoSize.jsx';


export default function AccessoriesBelt(){
return(
    <>
    <section className ="page-header">
        <h1>Obi belts</h1>
    </section>
    <ProductComponent category="accessories-obibelts"/>
    <Footer />
    </>
)
}