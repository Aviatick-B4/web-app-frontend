import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda.jsx";
import HasilPencarian from "./pages/HasilPencarian.jsx";
import RiwayatPemesanan from "./pages/user/RiwayatPemesanan.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/daftar" element={<Register />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/lupa-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verifikasi-email" element={<EmailVerification />} />
        <Route path="/hasil-pencarian" element={<HasilPencarian />} />
        <Route path="/user/riwayat-pemesanan" element={<RiwayatPemesanan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
