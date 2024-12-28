import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBooks />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
