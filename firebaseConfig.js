// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK-a7fcI7RSzv8DDY6anBIVdg4oiUTdUU",
  authDomain: "courtpayment2.firebaseapp.com",
  databaseURL: "https://courtpayment2-default-rtdb.firebaseio.com",
  projectId: "courtpayment2",
  storageBucket: "courtpayment2.appspot.com",
  messagingSenderId: "212187553650",
  appId: "1:212187553650:web:7564586e97cecf04f107eb"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
