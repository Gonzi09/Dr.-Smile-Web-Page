import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCBRdN3CDpRsrKYcIkdoNHWoNtfeC9E1HI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dr-smile-48406.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dr-smile-48406",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dr-smile-48406.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1081675370474",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1081675370474:web:a7961d9b8ed305f1056c93",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Y4787Q5WE5"
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