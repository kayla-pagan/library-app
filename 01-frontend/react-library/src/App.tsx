import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchBooks />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
