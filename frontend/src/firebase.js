// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgnaIo-PoKfMNlByDB5rj70iY1692sVps",
  authDomain: "mern-estate-bca59.firebaseapp.com",
  projectId: "mern-estate-bca59",
  storageBucket: "mern-estate-bca59.appspot.com",
  messagingSenderId: "269184077907",
  appId: "1:269184077907:web:1fc22571422ae5b36436a6",
  measurementId: "G-0X2X3V74HY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
