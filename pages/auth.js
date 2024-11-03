// pages/auth.js
import { useRouter } from "next/router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig"; // Assicurati che il percorso sia corretto

export default function Auth() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);
      router.push("/"); // Redirige alla home page dopo il login
    } catch (error) {
      console.error("Errore durante l'autenticazione:", error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <button onClick={signInWithGoogle} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Accedi con Google
      </button>
    </div>
  );
}
