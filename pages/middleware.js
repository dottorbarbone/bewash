import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "./auth";

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

// Inizializza l'app Firebase Admin una sola volta
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export async function middleware(req) {
  const token = req.cookies.get("__session")?.value; // Cambia con il nome del tuo cookie o header

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verifica il token con Firebase Admin
    await getAuth().verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error("Errore di autenticazione:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

