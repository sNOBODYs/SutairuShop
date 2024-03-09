import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { getAnalytics } from "firebase/analytics";
import { getFirestore , doc , getDoc ,getDocs, setDoc , collection, addDoc,updateDoc, deleteDoc, deleteField } from "firebase/firestore";
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
import AccessoriesBelt from './views/AccessoriesPages/Accessories_BeltView';
import AccessoriesFan from './views/AccessoriesPages/Accessories_FanView';
import AccessoriesMask from './views/AccessoriesPages/Accessories_MaskView';
import AccessoriesUmbrella from './views/AccessoriesPages/Accessories_UmbrellaView';
import DecorNeko from './views/DecorPages/Decor_NekoView';
import DecorNoren from './views/DecorPages/Decor_NorenView';
import DecorStationery from './views/DecorPages/Decor_StationeryView';
import DecorWallArt from './views/DecorPages/Decor_WallArt';
import SignUp from './views/Signup';
import { AuthProvider } from './contexts/AuthContext';
//-----------------------------------------------

function App() {
  return (
    <div className="App">
     <AuthProvider>
      <BrowserRouter>
     <Routes>
      <Route index  element = {<HomeView />}/>
      <Route path ="/sutairu" element ={<HomeView />}/>
      <Route path ="/signup" element ={<SignUp />}/>
      <Route path ="/men/kimono-jackets" element ={<MensKimonoJackets />}/>
      <Route path ="/men/kimonos" element ={<MensKimono />}/>
      <Route path ="/men/shirts" element ={<MensShirts />}/>
      <Route path ="/men/hoodies" element ={<MensHoodie />}/>
      <Route path ="/men/geta" element ={<Geta />}/>
      <Route path ="/women/dresses" element ={<WomenDress />}/>
      <Route path ="/women/kimonos" element ={<WomenKimono />}/>
      <Route path ="/women/pajamas" element ={<WomenPajamas />}/>
      <Route path ="/accessories/obi-belts" element ={<AccessoriesBelt />}/>
      <Route path ="/accessories/fans" element ={<AccessoriesFan />}/>
      <Route path ="/accessories/masks" element ={<AccessoriesMask />}/>
      <Route path ="/accessories/umbrellas" element ={<AccessoriesUmbrella />}/>
      <Route path ="/decor/neko" element ={<DecorNeko />}/>
      <Route path ="/decor/noren" element ={<DecorNoren />}/>
      <Route path ="/decor/stationery" element ={<DecorStationery />}/>
      <Route path ="/decor/wall-art" element ={<DecorWallArt />}/>
      <Route path ="*" element ={<NoPageView />}/>
     </Routes>
     </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
