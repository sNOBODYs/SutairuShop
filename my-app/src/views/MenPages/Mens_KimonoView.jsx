import React from 'react'; 
import NavBar from '../../components/NavBar.jsx';
import Footer from '../../components/FooterComponent.jsx';
import MobileMenu from '../../components/MobileMenu.jsx';

export default function MensKimono(){
return(
    <>
    <MobileMenu />
    <NavBar />
    <h1>Mens Kimono Page</h1>
    <Footer />
    </>
)
}