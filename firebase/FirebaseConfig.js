
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAg9Lg5qLkaASQIVNZ_g2pOYJEvkg4SqA",
  authDomain: "chat-app-assignment-23ddf.firebaseapp.com",
  projectId: "chat-app-assignment-23ddf",
  storageBucket: "chat-app-assignment-23ddf.appspot.com",
  messagingSenderId: "525399763515",
  appId: "1:525399763515:web:1895454eff74a470944a1e",
   // DATABASE-URL ADDED TO MANAGE LOCATION ERROR  ====================================>
   databaseURL:"https://chat-app-assignment-23ddf-default-rtdb.firebaseio.com/",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);