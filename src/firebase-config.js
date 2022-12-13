// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAC6BWPLqnPW_jBkCsTWR7opUAcYGhPClQ",
    authDomain: "hifi-social-media-app.firebaseapp.com",
    projectId: "hifi-social-media-app",
    storageBucket: "hifi-social-media-app.appspot.com",
    messagingSenderId: "808190796490",
    appId: "1:808190796490:web:7cdce5f7250ad914a90a33",
    measurementId: "G-SW8C14C05C"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
