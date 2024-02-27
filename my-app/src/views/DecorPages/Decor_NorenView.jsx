import React from 'react'; 
import NavBar from '../../components/NavBar.jsx';
import Footer from '../../components/FooterComponent.jsx';
import MobileMenu from '../../components/MobileMenu.jsx';

export default function DecorNoren(){
return(
    <>
    <MobileMenu />
    <NavBar />
    <h1>Decor Noren Page</h1>
    <Footer />
    </>
)
}