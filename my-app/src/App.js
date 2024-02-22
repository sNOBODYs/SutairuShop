import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import firebaseConfig from './config/firebase';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore , doc , getDoc ,getDocs, setDoc , collection, addDoc,updateDoc, deleteDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js"
import { getDownloadURL, ref, getStorage } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import './styles/App.css';
import HomeView from './views/HomeView';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const storageRef = ref(storage);


const videoRef = ref(storage, 'backroundVideoEdited.mp4')

getDownloadURL(videoRef)
.then((url) => {
    // `url` is the download URL for the video
    const videoElement = document.getElementById('backgroundVideo');
    videoElement.src = url;
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
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
