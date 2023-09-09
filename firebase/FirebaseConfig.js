import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAedkMUCb-QxcnFAnLtSTQ0CSctXrlNVMc",
    authDomain: "chat-app-assignment-a6ef6.firebaseapp.com",
    databaseURL: "https://chat-app-assignment-a6ef6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-assignment-a6ef6",
    storageBucket: "chat-app-assignment-a6ef6.appspot.com",
    messagingSenderId: "7127908884",
    appId: "1:7127908884:web:2b6493acbbcabda68e5d01",
    measurementId: "G-FSSSG7QXL6"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
