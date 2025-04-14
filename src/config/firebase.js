// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcjApQrIWDkMofJIZFmlXFX00qu9FPxGk",
  authDomain: "c4change-ed63e.firebaseapp.com",
  projectId: "c4change-ed63e",
  storageBucket: "c4change-ed63e.firebasestorage.app",
  messagingSenderId: "474749400200",
  appId: "1:474749400200:web:7d357cc324a405b14ddb3d",
  measurementId: "G-814W175T8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };