import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda.jsx";
import Pemesanan from "./pages/Pemesanan.jsx";
import Pembayaran from "./pages/user/Pembayaran.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import HasilPencarian from "./pages/HasilPencarian.jsx";
import RiwayatPemesanan from "./pages/user/RiwayatPemesanan.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import KonfirmasiPemesanan from "./pages/KonfirmasiPemesanan.jsx";
import Akun from "./pages/user/Akun.jsx";
import Notifikasi from "./pages/user/Notifikasi.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/pemesanan" element={<Pemesanan />} />
            <Route
              path="/konfirmasi-pemesanan"
              element={<KonfirmasiPemesanan />}
            />
            <Route path="/pembayaran" element={<Pembayaran />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/" element={<Beranda />} />
            <Route path="/daftar" element={<Register />} />
            <Route path="/masuk" element={<Login />} />
            <Route path="/akun-saya" element={<Akun />} />
            <Route path="/notifikasi" element={<Notifikasi />} />
            <Route path="/lupa-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verifikasi-email" element={<EmailVerification />} />
            <Route path="/hasil-pencarian" element={<HasilPencarian />} />
            <Route path="/riwayat-pemesanan" element={<RiwayatPemesanan />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
