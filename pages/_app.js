import Nav from "/components/Nav";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-fuchsia-300">
      <div className="backdrop-blur-sm bg-white/50">
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </div>
    </div>
  );
}

export default MyApp;
