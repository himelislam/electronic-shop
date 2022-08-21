// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6BzP0yNToxt7lpqGWqQgRLa-LskqgMOI",
  authDomain: "electronic-shop-3b71a.firebaseapp.com",
  projectId: "electronic-shop-3b71a",
  storageBucket: "electronic-shop-3b71a.appspot.com",
  messagingSenderId: "892477009303",
  appId: "1:892477009303:web:53f7f8618cdc6530d268d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;