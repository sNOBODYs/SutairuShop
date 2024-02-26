import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import firebaseConfig from './config/firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore , doc , getDoc ,getDocs, setDoc , collection, addDoc,updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import './styles/App.css';

//-------------Importing Pages-------------------
import HomeView from './views/HomeView';
import NoPageView from './views/NoPage';
import MensKimonoJackets from './views/MenPages/Mens_Kimono_JacketsView';
import MensKimono from './views/MenPages/Mens_KimonoView';
import MensHoodie from './views/MenPages/Mens_HoodieView';
import MensShirts from './views/MenPages/Mens_ShirtsView';
import Geta from './views/MenPages/GetaView';
import WomenDress from './views/WomenPages/Women_DressView';
import WomenKimono from './views/WomenPages/Women_KimonoView';
import WomenPajamas from './views/WomenPages/Women_PajamasView';
//-----------------------------------------------

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();


const videoRef = ref(storage, 'backroundVideoEdited.mp4')
const sutairuIconRef = ref(storage, 'mainPage/variant5.png')

getDownloadURL(videoRef,sutairuIconRef)
.then((url) => {
    // `url` is the download URL for the video
    const videoElement = document.getElementById('backgroundVideo');
    const sutairuIconElement = document.getElementsByClassName('logo');
    videoElement.src = url;
    sutairuIconElement.src = url;
  })
  .catch((error) => {
    // Handle any errors
    console.error(error);
  });
  


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route index  element = {<HomeView />}/>
      <Route path ="/sutairu" element ={<HomeView />}/>
      <Route path ="/men/kimono-jackets" element ={<MensKimonoJackets />}/>
      <Route path ="/men/kimonos" element ={<MensKimono />}/>
      <Route path ="/men/shirts" element ={<MensShirts />}/>
      <Route path ="/men/hoodies" element ={<MensHoodie />}/>
      <Route path ="/men/geta" element ={<Geta />}/>
      <Route path ="/women/dresses" element ={<WomenDress />}/>
      <Route path ="/women/kimonos" element ={<WomenKimono />}/>
      <Route path ="/women/pajamas" element ={<WomenPajamas />}/>
      <Route path ="*" element ={<NoPageView />}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
