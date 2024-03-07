import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const app = initializeApp({
    apiKey: "AIzaSyAaszrRGEXDSGYNKCwfW2gk5J2hJBDuBsI",
    authDomain: "sutairu-site.firebaseapp.com",
    projectId: "sutairu-site",
    storageBucket: "sutairu-site.appspot.com",
    messagingSenderId: "267848137156",
    appId: "1:267848137156:web:00feb00c0c4da936124c91",
    measurementId: "G-GP18DLVWWJ"
  });
  
  export const auth = getAuth(app);
  export default app;