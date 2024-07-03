import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FilterButtonProvider } from "./components/buttons/FilterButtonContext.jsx";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Payment from "./pages/user/Payment.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Error from "./pages/errorPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BookingHistory from "./pages/user/BookingHistory.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import MyAccount from "./pages/user/MyAccount.jsx";
import Notification from "./pages/user/Notification.jsx";
import NotFound from "./pages/NotFound.jsx";
import NoAccessToken from "./components/NoAccessToken.jsx";
import TicketConfirmation from "./pages/TicketConfirmation.jsx";

function App() {
  return (
    <FilterButtonProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GoogleOAuthProvider clientId="1056659934932-di3nci2kbsr0ouiqjp5fnn0v1asocgg7.apps.googleusercontent.com">
            <BrowserRouter>
              <Routes>
                <Route path="/pemesanan" element={<Booking />} />
                <Route path="/konfirmasi-tiket" element={<TicketConfirmation />} />
                <Route path="/pembayaran" element={<Payment />} />
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/error" element={<Error />} />
                <Route path="/" element={<Home />} />
                <Route path="/daftar" element={<Register />} />
                <Route path="/masuk" element={<Login />} />
                <Route
                  path="/akun-saya"
                  element={
                    <div>
                      <MyAccount />
                      <NoAccessToken />
                    </div>
                  }
                />
                <Route
                  path="/notifikasi"
                  element={
                    <div>
                      <Notification />
                      <NoAccessToken />
                    </div>
                  }
                />
                <Route path="/lupa-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verifikasi-email" element={<EmailVerification />} />
                <Route path="/hasil-pencarian" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
                <Route
                  path="/hasil-pencarian/promo/:promoId"
                  element={<SearchPage />}
                />
                <Route
                  path="/hasil-pencarian/destinasi"
                  element={<SearchPage />}
                />
                <Route
                  path="/riwayat-pemesanan"
                  element={
                    <div>
                      <BookingHistory />
                      <NoAccessToken />
                    </div>
                  }
                />
              </Routes>
              <ToastContainer />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </FilterButtonProvider>
  );
}

export default App;
