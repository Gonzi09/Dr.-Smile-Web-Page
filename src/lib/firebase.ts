import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBRdN3CDpRsrKYcIkdoNHWoNtfeC9E1HI",
  authDomain: "dr-smile-48406.firebaseapp.com",
  projectId: "dr-smile-48406",
  storageBucket: "dr-smile-48406.appspot.com",
  messagingSenderId: "1081675370474",
  appId: "1:1081675370474:web:a7961d9b8ed305f1056c93",
  measurementId: "G-Y4787Q5WE5"
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