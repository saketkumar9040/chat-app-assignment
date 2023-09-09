import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyAySqOhfEC53M3r0uAryHiH7Jgtg1VpGxo",
  authDomain: "chat-app-assignment-4451f.firebaseapp.com",
  databaseURL: "https://chat-app-assignment-4451f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-assignment-4451f",
  storageBucket: "chat-app-assignment-4451f.appspot.com",
  messagingSenderId: "68356262271",
  appId: "1:68356262271:web:f7a8b86fe9a3948a31724a"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {firebase, db, auth };
