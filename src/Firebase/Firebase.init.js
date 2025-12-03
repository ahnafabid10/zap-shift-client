// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey_KEY,
  authDomain:import.meta.env.VITE_authDomain_KEY,
  projectId:import.meta.env.VITE_projectId_KEY,
  storageBucket:import.meta.env.VITE_storageBucket_KEY,
  messagingSenderId:import.meta.env.VITE_messagingSenderId_KEY,
  appId:import.meta.env.VITE_appId_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
