import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmEa8AQyciveOAdO80epsb3QbHOpuFTQo",
  authDomain: "morozov-jurist.firebaseapp.com",
  projectId: "morozov-jurist",
  storageBucket: "morozov-jurist.firebasestorage.app",
  messagingSenderId: "592853730932",
  appId: "1:592853730932:web:b9181c7963e128349bb321",
  measurementId: "G-EPP3LML22F"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
