import React, { useEffect } from 'react';
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import '../styles/AboutUs.css';
import FooterComponent from '../components/FooterComponent';
import { Link } from 'react-router-dom';



const storage = getStorage();
const japanImageRef = ref(storage, 'japan-landscape.jpg');

export default function AboutUs() {
  useEffect(() => {
    getDownloadURL(japanImageRef)
      .then((url1) => {
        const japanImage = document.getElementById('japanImage');
        japanImage.src = url1;
      })
      .then(() => {
        return getDownloadURL(japanImageRef);
      })
  }, []);
  return (
    <div>
      <div className="about-us-container">
        <h1>ABOUT</h1>
        <p className='under-header-about'>Sutairu is a cultural magazine and online store, presenting the most inspiring Japanese art & design. </p>
        <img id='japanImage' alt="Japan Landscape" />
        <p className='paragraph1'>Japan's masterpieces are spread throughout the islands' many museums, galleries, temples, and studios, often trapped
          behind a daunting language barrier, leaving many people uncertain how to proceed. But <strong>enjoying Japan's art and culture needn't be difficult</strong> exploring
          these must-see artworks and travel hotspots, whether online or in person, should be an enriching and captivating experience!</p>
        <p className='paragraph2'>At Sutairu we are enamored with the <strong>wealth of inspirational objects in this beautiful country</strong>. Over the last few years
          we have embarked on an enlightening journey to research these incredible arts, which are too little known by culture lovers internationally.</p>
        <p className='paragraph3'>We hope that through out our site you will have <strong>the most pleasent experience</strong>, which will help you get emmersed in the japanese spirit! </p>
        <p className='closing-sentence-about'>Have a nice shopping!</p>
        <Link to={'/'} className="back-to-home-about">
          <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/1A1A1A/left.png" alt="left" />
          Back to home
        </Link>
      </div>
      <FooterComponent />
    </div>
  )
}
