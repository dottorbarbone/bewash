import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, 'eliabarbaric@icloud.com', 'Prova1234')
  .then((userCredential) => {
    // L'utente è autenticato
    console.log('Accesso riuscito:', userCredential.user);
  })
  .catch((error) => {
    console.error('Errore di accesso:', error.message);
  });
  console.log('Il tuo UID è:', userCredential.user.uid);
