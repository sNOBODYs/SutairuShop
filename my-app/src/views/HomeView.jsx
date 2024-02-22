import React from 'react';
import NavBar from '../components/NavBar.jsx';
import '../styles/HomeViewStyle.css';
import firebaseConfig from '../config/firebase.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDownloadURL, ref, getStorage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);
const image1Ref = ref(storage, 'mainPage/kimonoMan.jpg')
const image2Ref = ref(storage, 'mainPage/kimonoGirl.jpg')
const image3Ref = ref(storage, 'mainPage/japaneseHoodie.jpg')
const image4Ref = ref(storage, 'mainPage/suakanJacket.jpg')


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
        </div>
    )
}