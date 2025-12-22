import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase del cliente
const firebaseConfig = {
  apiKey: "AIzaSyA06HtsUf7dZxGoXziREXFZel18F4SF9rU",
  authDomain: "drsmile-9f06b.firebaseapp.com",
  projectId: "drsmile-9f06b",
  storageBucket: "drsmile-9f06b.firebasestorage.app",
  messagingSenderId: "130105074854",
  appId: "1:130105074854:web:1478fed4c8caa9315ac067",
  measurementId: "G-3X19G52KRZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;