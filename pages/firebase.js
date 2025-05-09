// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiJkUm3ioqM1aFRKeIfbrAmImq6Jq2-VM",
  authDomain: "bewash-bb768.firebaseapp.com",
  databaseURL: "https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bewash-bb768",
  storageBucket: "bewash-bb768.firebasestorage.app",
  messagingSenderId: "170123363473",
  appId: "1:170123363473:web:15adc0ad813b68b213eb30",
  measurementId: "G-QC730GJFDX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Log per verificare l'inizializzazione
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Utente loggato:", user.uid);
  } else {
    console.log("Nessun utente loggato");
  }
});

export { auth };
