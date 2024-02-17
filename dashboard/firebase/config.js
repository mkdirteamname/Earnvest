// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeZNyxv9e6fXEBTQzmwuJPz2E6SvA1RPg",
  authDomain: "portfolio-management-93402.firebaseapp.com",
  projectId: "portfolio-management-93402",
  storageBucket: "portfolio-management-93402.appspot.com",
  messagingSenderId: "959390801965",
  appId: "1:959390801965:web:0720f0bedf849de90b58a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
