import React, { useEffect } from 'react';
import Footer from '../components/FooterComponent.jsx';
import '../styles/HomeViewStyle.css';
import firebaseConfig from '../config/firebase.js';
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { app } from '../config/firebase.js'


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
const infoImage1Ref = ref(storage, 'mainPage/infoImage1.webp')
const infoImage2Ref = ref(storage, 'mainPage/infoImage2.webp')
const videoRef = ref(storage, 'backroundVideoEdited.mp4')




export default function HomeView() {
    useEffect(() => {

        getDownloadURL(videoRef)
            .then((url) => {
                const videoElement = document.getElementById('backgroundVideo');
                videoElement.src = url;
            })
            .catch((error) => {
                console.error(error);
            });
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
            .then(() => {
                return getDownloadURL(infoImage1Ref);
            })
            .then((url15) => {
                const infoImage1Element = document.getElementById('info-image1');
                infoImage1Element.src = url15;
            })
            .then(() => {
                return getDownloadURL(infoImage2Ref);
            })
            .then((url16) => {
                const infoImage2Element = document.getElementById('info-image2');
                infoImage2Element.src = url16;
            })
            .catch((error) => {
                console.error(error);
            });
    });
    return (
        <div>
            <video id="backgroundVideo" autoPlay loop muted playsInline></video>
            <div className="content-above-video">
                <h1>Japanese Clothes</h1>
                <h3><i className="fa fa-play" style={{ color: '#000000' }}></i>Authentic & Traditional</h3>
            </div>
            <div className="img-box">
                <div className="colum1">
                    <div className="image-container">
                        <a href="/mens-kimono">
                            <img className="image1" id='image1' alt="Kimono Men" />
                            <p className="image-text1">Kimono for Men</p>
                        </a>
                    </div>
                    <div className="image-container">
                        <a href="/women-kimono">
                            <img className="image2" id='image2' alt="Kimono Women" />
                            <p className="image-text2">Kimono for Women</p>
                        </a>
                    </div>
                </div>
                <div className="colum2">
                    <div className="image-container">
                        <a href="/mens-hoodie">
                            <img className="image3" id='image3' alt="Japanese Hoodie" />
                            <p className="image-text3">Japanese Hoodie</p>
                        </a>
                    </div>
                    <div className="image-container">
                        <a href="/mens-kimono-jackets">
                            <img className="image4" id='image4' alt="Japanese Noren" />
                            <p className="image-text4">Sukajan Jacket</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="products">
                <div className="row-products">
                    <img id='product1' alt="products1" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Long Kimono Jacket Women 'Okariya'</h4>
                        <p className="shop-item-price">$45.00</p>
                    </div>
                </div>

                <div className="row-products">
                    <img id='product2' alt="products2" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Japanese Blouse 'Toyama'</h4>
                        <p className="shop-item-price">$35.00</p>
                    </div>
                </div>

                <div className="row-products">
                    <img id='product3' alt="products3" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Japanese Shirts for Women 'Sakoya'</h4>
                        <p className="shop-item-price">$40.00</p>
                    </div>
                </div>

                <div className="row-products">
                    <img id='product4' alt="products4" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Floral Kimono Jacket 'Harajuku'</h4>
                        <p className="shop-item-price">$40.00</p>
                    </div>
                </div>

                <div className="row-products">
                    <img id='product5' alt="products5" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Mens Kimono Jacket 'Hideki'</h4>
                        <p className="shop-item-price">$55.00</p>
                    </div>
                </div>

                <div className="row-products">
                    <img id='product6' alt="products6" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Plus Size Kimono Jacket 'Takao'</h4>
                        <p className="shop-item-price">$65.00</p>
                    </div>
                </div>

                <div className="row-products">
                    <img id='product7' alt="products7" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Black and Gold Kimono Jacket 'Kaito'</h4>
                        <p className="shop-item-price">$65.00</p>
                    </div>
                </div>
                <div className="row-products">
                    <img id='product8' alt="products8" />
                    <div className='circle-container'>
                        <div className="hearth-icon">
                            <i className="fa-solid fa-heart fa-xl" style={{ color: '#000000' }}></i>
                        </div>
                    </div>
                    <div className="price">
                        <h4 className="shop-item-title">Japanese Jacket Mens 'Hisashi'</h4>
                        <p className="shop-item-price">$55.00</p>
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
                        <img className="image1-blackbox" id='image1-blackbox' alt="blackboxImage1" />
                        <img className="image2-blackbox" id='image2-blackbox' alt="blackboxImage2" />
                    </div>
                </div>
                <div className="slider-container2">
                    <div className="slider-text2">
                        日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る 日 本 の ナ ン バ ー ワ ン シ ョ ッ プ の 歴 史 に 迫 る
                    </div>
                </div>
            </div>
            <div className="info-row">
                <div className="item1-info">
                    <img id='info-image1' alt="infoImage" />
                    <h5><i className="fa fa-play" style={{ color: '#000000' }}></i>The Japanese Kimono</h5>
                    <p>Real key element of Japanese fashion, the Japanese kimono is regularly made of cotton or silk. This
                        <span>traditional japanese clothing</span> is worn during special events or for cosplay, it is often composed of traditional Japanese patterns in a plain color without forgetting what makes the charm of the
                        <span> japanese style kimono</span>: the obi belt with a rather atypical knot!
                    </p>
                    <p>Nowadays, the <span>traditional japanese kimono</span> and all its variants such as the Yukata, the kimono cardigan, the kimono jacket also called haori or the kimono pajamas are anchored in the western fashion.</p>
                    <p>Its loose fit, soft fabric, traditional japanese prints and three-quarter length sleeves make this <span>japanese clothing</span> a complete outfit to finalize a casual, chic and classy Japanese style.</p>
                </div>
                <div className="item2-info">
                    <img id='info-image2' alt="infoImage" />
                    <h5><i className="fa fa-play" style={{ color: '#000000' }}></i>The Japanese Store</h5>
                    <p>Sutairu has a range of japanese products for all ages. From <span>japanese streetwear</span> to traditional without forgetting the essential part in the land of the rising sun, japanese decor!</p>
                    <p>Looking for a specific japanese dress to complement your style? You'll easily find the perfect <span>kimono jacket</span> for a relaxing summer while staying well-dressed. Don't forget to equip the traditional Japanese shoe for a complete Japanese look.</p>
                    <p><span>The geta sandals</span> is mainly worn with tabi socks and a long kimono for an unparalleled elegance. It can also replace flip-flops with an inner garment for a perfect compromise between comfort and delicacy with a japanese touch.</p>
                </div>
            </div>
            <div className="last-text-section">
                <h5><i className="fa fa-play" style={{ color: '#000000' }}></i>The japanese clothing and streetwear store</h5>
                <p>Sutairu is a reference in <span>japanese fashion</span>. With streetwear but also traditional clothing, this store specialized in japanese culture sources its products from Asian countries to satisfy and surprise its customers with a constant innovation. Passionate about Japanese culture for years, Japan-clothing stands out and offers a multitude of original <span>traditional japanese clothes</span> and updates its collections every season for always more novelty in your daily life.</p>
                <p>Our <span>japanese online store</span> is very popular in major cities. We also have the latest models of japanese clothing, whether they are for children in a casual style, for adults in a traditional Japanese universe or for teenagers in an urban style inspired by Tokyo or Harajuku. We are now the <span>number one shop for japanese streetwear</span> and we continue to bring this wind of renewal with new pieces every month!</p>
                <p>Let yourself go by browsing through the multiple collections of our <span>japanese store</span>. We are sure you will find the latest fashionable kimono for both men and women. Or one of our hundreds of kimono jackets with Japanese patterns and prints will fill your wardrobe for a cool summer look with a street style twist. Moreover, you will find in our <span>japan store</span> a lot of Japanese embroidered jackets called Sukajan as well as bombers without forgetting the very famous japanese hoodie!</p>
            </div>
            <Footer />
        </div>
    )
}

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", revealElement);

    function revealElement() {
        var revealElements = document.querySelectorAll(".products, .image1-blackbox, .image2-blackbox");

        revealElements.forEach((element) => {
            var elementTop = element.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;

            if (elementTop < windowHeight) {
                element.classList.add("reveal");
            } else {
                element.classList.remove("reveal");
            }

            if (elementTop < windowHeight) {
                element.classList.add("fade-in");
            } else {
                element.classList.remove("fade-in");
            }
        });
    }
});