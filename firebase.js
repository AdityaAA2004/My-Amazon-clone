// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { getFirestore } from 'firebase-admin/firestore';
import {getApp} from "firebase-admin/app";
import {initializeApp} from "firebase-admin/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdlTa1qWiHN4P5192Ls1oJ5TzYOmT2GtQ",
  authDomain: "clone-2-99846.firebaseapp.com",
  projectId: "clone-2-99846",
  storageBucket: "clone-2-99846.appspot.com",
  messagingSenderId: "509246237994",
  appId: "1:509246237994:web:5128b8a7fcb347355ac253"
};

// Initialize Firebase

function InitializeAppIfNecessary() {
  try {
    return getApp()
  } catch (e) {
    return initializeApp(firebaseConfig)
  }

}

const app = InitializeAppIfNecessary()
const db = getFirestore(app)

export {app,db}
// Initialize Firebase
