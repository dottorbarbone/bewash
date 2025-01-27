import "@/styles/globals.css";
import { UserProvider } from "./usercontext";
export default function App({ Component, pageProps }) {
  return(
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  ) 
}
