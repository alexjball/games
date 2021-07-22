import type { AppProps } from "next/app";
import "../styles/game.css";
import "../styles/globals.css";
import "../styles/chess.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
