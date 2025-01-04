// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr45BJ044zV8Os7h5ukOgfeFQ8Ka4Igao",
  authDomain: "login-e07ef.firebaseapp.com",
  projectId: "login-e07ef",
  storageBucket: "login-e07ef.firebasestorage.app",
  messagingSenderId: "916269643063",
  appId: "1:916269643063:web:126989e7f4f940e0a2d6b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;