//Firebase File Name -> Firebase

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword, signOut   } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, child, onChildAdded, onChildChanged} from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9K91c46Vj_NFA1HBbsE_xvG1wEVWW6ek",
  authDomain: "fir-bef55.firebaseapp.com",
  projectId: "fir-bef55",
  storageBucket: "fir-bef55.appspot.com",
  messagingSenderId: "448512171128",
  appId: "1:448512171128:web:bd6f752248e70542de218d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const auth = getAuth()

export {auth,createUserWithEmailAndPassword, updateProfile, 
       getDatabase, ref, set, signInWithEmailAndPassword ,
       signOut, push, onValue, child, onChildAdded, onChildChanged,
       storage}