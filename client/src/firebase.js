// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: isLocalhost
    ? "mern-stack-realestate-platform.firebaseapp.com" // Local
    : "kohiestate.onrender.com", // Production

  projectId: "mern-stack-realestate-platform",
  storageBucket: "mern-stack-realestate-platform.firebasestorage.app",
  messagingSenderId: "719021316966",
  appId: "1:719021316966:web:eb5fd3a5687946fbf146a7",
  measurementId: "G-VKDZWJDZHP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
