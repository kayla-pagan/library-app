import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import Layout from "./components/Layout";
import CheckoutBook from "./pages/CheckoutBook";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth(oktaConfig)

function App() {
  const navigate = useNavigate()
  const handleAuth = () => navigate("/login")
  const restoreOriginalUri = async () => {
    const relativeUrl = toRelativeUrl(originalUri || "/", window.location.origin)
    navigate(relativeUrl, { replace: true })
  }


  return (
    <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchBooks />} />
            <Route path="/checkout/:bookId" element={<CheckoutBook />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
