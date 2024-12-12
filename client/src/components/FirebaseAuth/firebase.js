// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD__BsebOOKAnuZtu3XPgkq33l4Z321kjA",
  authDomain: "wm-studenthub.firebaseapp.com",
  projectId: "wm-studenthub",
  storageBucket: "wm-studenthub.firebasestorage.app",
  messagingSenderId: "787299348386",
  appId: "1:787299348386:web:9e688f392ffc9966c68cfb",
  measurementId: "G-WXCJ1MYQY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
