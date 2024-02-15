// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe-KGdR_z_RX_YZ3JaTuUb8QnbKurcd_E",
  authDomain: "auth-boss.firebaseapp.com",
  databaseURL: "https://auth-boss-default-rtdb.firebaseio.com",
  projectId: "auth-boss",
  storageBucket: "auth-boss.appspot.com",
  messagingSenderId: "415231593338",
  appId: "1:415231593338:web:f1437a5a94f0e869f8e4c3",
  measurementId: "G-CE77VC32BE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
