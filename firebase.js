// Your web app's Firebase configuration
import { getFirestore } from 'firebase-admin/firestore';
import { getApps,getApp,initializeApp } from 'firebase-admin/app';

const firebaseConfig = {
  apiKey: "AIzaSyBdlTa1qWiHN4P5192Ls1oJ5TzYOmT2GtQ",
  authDomain: "clone-2-99846.firebaseapp.com",
  projectId: "clone-2-99846",
  storageBucket: "clone-2-99846.appspot.com",
  messagingSenderId: "509246237994",
  appId: "1:509246237994:web:5128b8a7fcb347355ac253"
};

const app = initializeApp(firebaseConfig,'amazon-clone-2')
const db = getFirestore(app)

export {app,db}
// Initialize Firebase
