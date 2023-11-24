// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEfRN9CQ1dxiDb7FgHYYOiT1v0YvZ7-V4",
  authDomain: "forum-app-c106d.firebaseapp.com",
  databaseURL: "https://forum-app-c106d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "forum-app-c106d",
  storageBucket: "forum-app-c106d.appspot.com",
  messagingSenderId: "517474780259",
  appId: "1:517474780259:web:36bda07b00e446d163e456",
  databaseURL: 'https://forum-app-c106d-default-rtdb.europe-west1.firebasedatabase.app/'

};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);