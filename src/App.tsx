import styles from "./styles/style";
import { Navbar, Footer } from "./Components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage, OtherPage,
} from "./pages";
import { Magic } from "magic-sdk";
import { TaquitoExtension } from "@magic-ext/taquito";


export const magic = new Magic(import.meta.env.VITE_MAGIC, {
  extensions: [
    new TaquitoExtension({
      rpcUrl: import.meta.env.VITE_RPC,
    }),
  ],
});

function App() {
  return (
    <div className="w-full">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/other" element={<OtherPage />} />
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </Router>
        </div>
      </div>
      <div
        className={`bg-primary mt-10 ${styles.paddingX} ${styles.flexCenter}`}
      >
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
