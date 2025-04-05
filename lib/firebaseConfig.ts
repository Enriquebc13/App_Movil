// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBc41pD08icjqzaT7epDy9aEaPMI-P9BQ0",
  authDomain: "tests-8026a.firebaseapp.com",
  projectId: "tests-8026a",
  storageBucket: "tests-8026a.firebasestorage.app",
  messagingSenderId: "805338897514",
  appId: "1:805338897514:web:140341270ab7432ede3e13"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar las instancias necesarias
export { auth, db };
