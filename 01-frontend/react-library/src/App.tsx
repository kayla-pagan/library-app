import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import Layout from "./components/Layout";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<SearchBooks />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
