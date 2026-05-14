// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASU6eFOuOhUW9o4hVyhwn7YZysfufNmRc",
  authDomain: "pokedex-dp.firebaseapp.com",
  projectId: "pokedex-dp",
  storageBucket: "pokedex-dp.firebasestorage.app",
  messagingSenderId: "464264806600",
  appId: "1:464264806600:web:ba41daa01c9722186c25fd",
  measurementId: "G-ZW3KDRK9VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);