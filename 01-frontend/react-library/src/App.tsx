import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";

function App() {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      <SearchBooks />
      <Footer />
    </>
  );
}

export default App;
