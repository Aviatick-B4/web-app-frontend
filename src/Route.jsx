import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda.jsx";
import Pemesanan from "./pages/Pemesanan.jsx";
import Pembayaran from "./pages/Pembayaran.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pemesanan />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
