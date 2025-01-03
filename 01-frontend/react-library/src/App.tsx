import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import Layout from "./components/Layout";
import CheckoutBook from "./pages/CheckoutBook";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import ReviewList from "./pages/ReviewList";

const oktaAuth = new OktaAuth(oktaConfig)

function App() {
  const navigate = useNavigate()
  const handleAuth = () => navigate("/login")
  const restoreOriginalUri = async () => {
    const originalUri = oktaAuth.getOriginalUri() || "/"
    const relativeUrl = toRelativeUrl(originalUri, window.location.origin)
    navigate(relativeUrl, { replace: true })
  }


  return (
    <div className="d-flex flex-column min-vh-100">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={handleAuth}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchBooks />} />
            <Route path="/reviewlist/:bookId" element={<ReviewList />} />
            <Route path="/checkout/:bookId" element={<CheckoutBook />} />
            <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
            <Route path="/login/callback" element={<LoginCallback />} />
          </Route>
        </Routes>
      </Security>
    </div>
  );
}

export default App;
