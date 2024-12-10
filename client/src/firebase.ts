// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "evently-f250f.firebaseapp.com",
  projectId: "evently-f250f",
  storageBucket: "evently-f250f.firebasestorage.app",
  messagingSenderId: "822289510525",
  appId: "1:822289510525:web:febd0145722afefb980114"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
