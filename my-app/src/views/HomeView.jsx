import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/HomeViewStyle.css';
import firebaseConfig from '../config/firebase.js';
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const image1Ref = ref(storage, 'mainPage/kimonoMan.jpg')
const image2Ref = ref(storage, 'mainPage/kimonoGirl.jpg')
const image3Ref = ref(storage, 'mainPage/japaneseHoodie.jpg')
const image4Ref = ref(storage, 'mainPage/suakanJacket.jpg')
const product1Ref = ref(storage, 'mainPage/productsMainPage1.png')
const product2Ref = ref(storage, 'mainPage/productsMainPage2.png')
const product3Ref = ref(storage, 'mainPage/productsMainPage3.png')
const product4Ref = ref(storage, 'mainPage/productsMainPage4.png')
const product5Ref = ref(storage, 'mainPage/productsMainPage5.png')
const product6Ref = ref(storage, 'mainPage/productsMainPage6.png')
const product7Ref = ref(storage, 'mainPage/productsMainPage7.png')
const product8Ref = ref(storage, 'mainPage/productsMainPage8.png')
const blackboxImageRef1 = ref(storage, 'mainPage/blackboxImage1.png')
const blackboxImageRef2 = ref(storage, 'mainPage/blackboxImage2.png')

getDownloadURL(image1Ref)
.then((url1) => {
    const image1Element = document.getElementById('image1');
    image1Element.src = url1;
})
.then(() => {
    return getDownloadURL(image2Ref);
})
.then((url2) => {
    const image2Element = document.getElementById('image2');
    image2Element.src = url2;
})
.then(() => {
    return getDownloadURL(image3Ref);
})
.then((url3) => {
    const image3Element = document.getElementById('image3');
    image3Element.src = url3;
})
.then(() => {
    return getDownloadURL(image4Ref);
})
.then((url4) => {
    const image4Element = document.getElementById('image4');
    image4Element.src = url4;
})
.then(() => {
    return getDownloadURL(product1Ref);
})
.then((url5) => {
    const product1Element = document.getElementById('product1');
    product1Element.src = url5;
})
.then(() => {
    return getDownloadURL(product2Ref);
})
.then((url6) => {
    const product2Element = document.getElementById('product2');
    product2Element.src = url6;
})
.then(() => {
    return getDownloadURL(product3Ref);
})
.then((url7) => {
    const product3Element = document.getElementById('product3');
    product3Element.src = url7;
})
.then(() => {
    return getDownloadURL(product4Ref);
})
.then((url8) => {
    const product4Element = document.getElementById('product4');
    product4Element.src = url8;
})
.then(() => {
    return getDownloadURL(product5Ref);
})
.then((url9) => {
    const product5Element = document.getElementById('product5');
    product5Element.src = url9;
})
.then(() => {
    return getDownloadURL(product6Ref);
})
.then((url10) => {
    const product6Element = document.getElementById('product6');
    product6Element.src = url10;
})
.then(() => {
    return getDownloadURL(product7Ref);
})
.then((url11) => {
    const product7Element = document.getElementById('product7');
    product7Element.src = url11;
})
.then(() => {
    return getDownloadURL(product8Ref);
})
.then((url12) => {
    const product8Element = document.getElementById('product8');
    product8Element.src = url12;
})
.then(() => {
    return getDownloadURL(blackboxImageRef1);
})
.then((url13) => {
    const blackboxImageElement1 = document.getElementById('image1-blackbox');
    blackboxImageElement1.src = url13;
})
.then(() => {
    return getDownloadURL(blackboxImageRef2);
})
.then((url14) => {
    const blackboxImageElement2 = document.getElementById('image2-blackbox');
    blackboxImageElement2.src = url14;
})
.catch((error) => {
    console.error(error);
});




export default function HomeView(html, login, mensKimonoJacket, mensKimono, mensHoodie, mensShirts, geta, womenKimono, womenDress, womenPajams, accessoriesMask, accessoriesUmbrella, accessoriesFan, accessoriesBelt, decorWallArt, decorStationery, decorNoren, decorNeko) {
    return (
        <div>
            <NavBar />
            <video id="backgroundVideo" autoPlay loop muted playsInline></video>
            <div className="content-above-video">
                <h1>Japanese Clothes</h1>
                <h3><i className="fa fa-play" style={{ color: '#000000' }}></i>Authentic & Traditional</h3>
            </div>
            <div className="img-box">
              <div className="colum1">
               <div className="image-container">
                 <a href="/mens-kimono">
                  <img className="image1" id ='image1' alt="Kimono Men"/>
                  <p className="image-text1">Kimono for Men</p>
                 </a>
                </div>
                <div className="image-container">
                <a href="/women-kimono">
                  <img className="image2" id ='image2' alt="Kimono Women"/>
                  <p className="image-text2">Kimono for Women</p>
                 </a>
                </div>
              </div>
              <div className="colum2">
               <div className="image-container">
                <a href="/mens-hoodie">
                   <img className="image3" id ='image3'  alt="Japanese Hoodie"/>
                   <p className="image-text3">Japanese Hoodie</p>
                 </a>
               </div>
                <div className="image-container">
                 <a href="/mens-kimono-jackets">
                   <img className="image4" id ='image4' alt="Japanese Noren"/>
                   <p className="image-text4">Sukajan Jacket</p>
                 </a>
                </div>
               </div>
            </div>
            <div className="products">
             <div className="row-products">
    <img id='product1' alt="products1"/>
    <div className="hearth-icon">
    <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
    </div>
    <div className="price">
        <h4 className ="shop-item-title">Long Kimono Jacket Women 'Okariya'</h4>
        <p className ="shop-item-price">$45.00</p>
    </div>
    </div>

    <div className="row-products">
        <img id='product2' alt="products2"/>
        <div className="hearth-icon">
        <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
        </div>
        <div className="price">
            <h4 className ="shop-item-title">Japanese Blouse 'Toyama'</h4>
            <p className ="shop-item-price">$35.00</p>
        </div>
        </div>

    <div className="row-products">
        <img id='product3' alt="products3"/>
        <div className="hearth-icon">
        <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
        </div>
        <div className="price">
            <h4 className ="shop-item-title">Japanese Shirts for Women 'Sakoya'</h4>
            <p className ="shop-item-price">$40.00</p>
        </div>
    </div>

    <div className="row-products">
            <img id='product4' alt="products4"/>
            <div className="hearth-icon">
            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
            </div>
            <div className="price">
                <h4 className ="shop-item-title">Floral Kimono Jacket 'Harajuku'</h4>
                <p className ="shop-item-price">$40.00</p>
            </div>
    </div>

    <div className="row-products">
        <img id='product5' alt="products5"/>
        <div className="hearth-icon">
        <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
        </div>
        <div className="price">
        <h4 className ="shop-item-title">Mens Kimono Jacket 'Hideki'</h4>
         <p className ="shop-item-price">$55.00</p>
        </div>
    </div>

    <div className="row-products">
        <img id='product6' alt="products6"/>
        <div className="hearth-icon">
        <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
        </div>
        <div className="price">
        <h4 className ="shop-item-title">Plus Size Kimono Jacket 'Takao'</h4>
        <p className ="shop-item-price">$65.00</p>
        </div>
    </div>

    <div className="row-products">
        <img id='product7' alt="products7"/>
        <div className="hearth-icon">
        <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
        </div>
       <div className="price">
        <h4 className ="shop-item-title">Black and Gold Kimono Jacket 'Kaito'</h4>
        <p className ="shop-item-price">$65.00</p>
      </div>
   </div>
     <div className="row-products">
      <img id='product8' alt="products8"/>
     <div className="hearth-icon">
     <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
       </div>
        <div className="price">
        <h4 className ="shop-item-title">Japanese Jacket Mens 'Hisashi'</h4>
        <p className ="shop-item-price">$55.00</p>
         </div>
     </div>
     </div>
     <div className="container-slider-text">
    <div className="slider-container">
       <div className="slider-text">
           日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る
       </div>
     </div>
     <div className="row-blackbox">
      <div className="item1-blackbox">
       <h5>Story of Japan Clothing</h5>
       <p>One goal, one ambition, one community</p>
       <p>Discover the history of the emblematic brand of Japanese streetwear left to conquer Europe.</p>
       <button className="back-to-top">History</button>
      </div>
      <div className="item2-blackbox">
       <img className="image1-blackbox" id='image1-blackbox' alt="blackboxImage1"/>
       <img className="image2-blackbox" id='image2-blackbox' alt="blackboxImage2"/>
      </div>
     </div>
     <div className="slider-container2">
       <div className="slider-text2">
           日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る
       </div>
     </div>
    </div>
    </div>
    
    )
}

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", revealElement);
  
    function revealElement() {
        var revealElements = document.querySelectorAll(".products, .image1-blackbox, .image2-blackbox");
      
        revealElements.forEach((element) => {
          var elementTop = element.getBoundingClientRect().top;
          var windowHeight = window.innerHeight;
      
          if (elementTop < windowHeight) {
            element.classList.add("reveal");
          }
      
          if (elementTop < windowHeight / 2) {
            element.classList.add("fade-in");
          }
        });
      }
  });