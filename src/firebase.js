// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUBTSMVVEJH8_6rcPQVerNOAhUEct2GVQ",
  authDomain: "tasty-hub-61b02.firebaseapp.com",
  projectId: "tasty-hub-61b02",
  storageBucket: "tasty-hub-61b02.appspot.com",
  messagingSenderId: "331357829088",
  appId: "1:331357829088:web:59833e0bd3c66166295d85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
