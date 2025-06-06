import {initializeApp, getApps, getApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFAvJKnOFuYgotglJW_TWWBOOQF3kWnpI",
  authDomain: "makenote-8cd2d.firebaseapp.com",
  projectId: "makenote-8cd2d",
  storageBucket: "makenote-8cd2d.firebasestorage.app",
  messagingSenderId: "824980570689",
  appId: "1:824980570689:web:8be317a8862b5b84a97cc0"
};

const app= getApps().length===0 ? initializeApp(firebaseConfig) : getApp();  // this is used to prevent double intiallization of app.
const db=getFirestore(app);

export {db}