// lib/auth.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Funzione per registrare un utente
export const register = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Funzione per effettuare il login
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Funzione per effettuare il logout
export const logout = async () => {
  return signOut(auth);
};
