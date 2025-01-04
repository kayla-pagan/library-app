import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import SpinnerLoading from "../utils/SpinnerLoading";

export default function Navbar() {
  const { oktaAuth, authState } = useOktaAuth();
  const activeStyle = {
    fontWeight: "600",
    color: "#2196f3",
  };

  if (!authState) {
    return <SpinnerLoading />;
  }

  console.log(authState)

  const handleLogout = async () => oktaAuth.signOut();

  return (
    <nav
      className="navbar navbar-light navbar-expand-lg shadow"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link to="/">
          <img
            className="nav-logo d-inline-block px-4"
            src="/main-ave-logo.svg"
            alt=""
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                to="/search"
              >
                Search Books
              </NavLink>
            </li>
            {authState?.isAuthenticated && 
              <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  to="/shelf"
                >
                  Shelf
                </NavLink>
              </li>
            }
          </ul>

          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              <li className="nav-item m-1">
                <Link className="btn btn-outline-dark" type="button" to="/login">
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
