import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import Layout from "./components/Layout";
import CheckoutBook from "./pages/CheckoutBook";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security, useOktaAuth } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import ReviewList from "./pages/ReviewList";
import Shelf from "./pages/Shelf";
import SpinnerLoading from "./utils/SpinnerLoading";
import Message from "./pages/Message";
import ManageLibrary from "./pages/ManageLibrary";

const oktaAuth = new OktaAuth(oktaConfig)

function App() {
  const navigate = useNavigate()
  const handleAuth = () => navigate("/login")
  const restoreOriginalUri = async () => {
    const originalUri = oktaAuth.getOriginalUri() || "/"
    const relativeUrl = toRelativeUrl(originalUri, window.location.origin)
    navigate(relativeUrl, { replace: true })
  }

  function ProtectedRoute({ children }: any){
    const { authState } = useOktaAuth()

    if(authState === undefined || authState === null) { return <SpinnerLoading /> }
    
    return authState?.isAuthenticated ? (<>{children}</>) : (<Navigate to="/login" replace />)
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
            <Route path="/shelf" element={
              <ProtectedRoute>
                <Shelf />
              </ProtectedRoute>} />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Message />
                </ProtectedRoute>} />
                <Route path="/admin" element={
                <ProtectedRoute>
                  <ManageLibrary />
                </ProtectedRoute>} />
          </Route>
        </Routes>
      </Security>
    </div>
  );
}

export default App;
