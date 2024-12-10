import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfCahSXjAbq2_Y7BFFCC2v0CS28WFU_Kc",
  authDomain: "undangan-digital-3d8f2.firebaseapp.com",
  projectId: "undangan-digital-3d8f2",
  storageBucket: "undangan-digital-3d8f2.firebasestorage.app",
  messagingSenderId: "735803769020",
  appId: "1:735803769020:web:80f005dac912b21fe190b9",
  measurementId: "G-GDRSDP3XP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
