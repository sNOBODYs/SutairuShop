import React from 'react'; 
import NavBar from '../../components/NavBar.jsx';
import Footer from '../../components/FooterComponent.jsx';
import MobileMenu from '../../components/MobileMenu.jsx';

export default function DecorNeko(){
return(
    <>
    <MobileMenu />
    <NavBar />
    <h1>Decor Neko Page</h1>
    <Footer />
    </>
)
}