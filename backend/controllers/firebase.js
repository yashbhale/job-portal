// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 👈 import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCNcA7Qgib8NdCGxrGRWTcx5-bC2h3ONYU",
  authDomain: "jobportal-d9e43.firebaseapp.com",
  projectId: "jobportal-d9e43",
  storageBucket: "jobportal-d9e43.firebasestorage.app",
  messagingSenderId: "399878635402",
  appId: "1:399878635402:web:904f1915d6a43ce1879273",
  measurementId: "G-5GLWXQM1BX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 👈 initialize Firestore

export { db };