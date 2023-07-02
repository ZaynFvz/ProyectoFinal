// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBctipVaZ0MX8n_4OopXJb6nch4bqXEe5I",
  authDomain: "proyectofinal-abd5f.firebaseapp.com",
  projectId: "proyectofinal-abd5f",
  storageBucket: "proyectofinal-abd5f.appspot.com",
  messagingSenderId: "26184605663",
  appId: "1:26184605663:web:94e87f129692d26e5eee6a",
  measurementId: "G-S5MS53CNH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);