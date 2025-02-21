// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA_a2Zrp4Cu4HZP5QdxcOEJRNGR8HsfUYU",
  authDomain: "vibemeet-efe7c.firebaseapp.com",
  projectId: "vibemeet-efe7c",
  storageBucket: "vibemeet-efe7c.firebasestorage.app",
  messagingSenderId: "618743889162",
  appId: "1:618743889162:web:d4994d8bbda4c840100ef3",
  measurementId: "G-L8M0N4BNJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const analytics = getAnalytics(app);
export {app,auth}