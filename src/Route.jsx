import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/Beranda.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Beranda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
