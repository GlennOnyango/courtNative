// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTb_9pPq5OyuLrRVNYXw-mF9H1nBzzPnI",
  authDomain: "courtpayment-3b15c.firebaseapp.com",
  databaseURL: "https://courtpayment-3b15c-default-rtdb.firebaseio.com",
  projectId: "courtpayment-3b15c",
  storageBucket: "courtpayment-3b15c.appspot.com",
  messagingSenderId: "848864737846",
  appId: "1:848864737846:web:22311f734fbcdabadbf697"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
