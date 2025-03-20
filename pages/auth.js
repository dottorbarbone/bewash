// lib/auth.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { getAuth } from "firebase/auth";

// Funzione per registrare un utente
export const register = async (email, password) => {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Utente registrato:", userCredential.user.uid);
    return userCredential;
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    throw error;
  }
};

// Funzione per effettuare il login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Utente loggato:", userCredential.user.uid);
    return userCredential;
  } catch (error) {
    console.error("Errore durante il login:", error);
    throw error;
  }
};

// Funzione per effettuare il logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logout effettuato");
  } catch (error) {
    console.error("Errore durante il logout:", error);
    throw error;
  }
};
