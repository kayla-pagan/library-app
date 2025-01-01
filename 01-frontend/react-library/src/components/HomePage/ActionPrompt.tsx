import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export default function ActionPrompt() {
  const { authState } = useOktaAuth();

  return (
    <>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                We would love to know what you have been reading. Whether it is
                to learn a new skill or simply unwinding, we can provide top
                content for your jouney!
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: "#0d47a1" }}
                  type="button"
                  to="search"
                >
                  Explore top books
                </Link>
              ) : (
                <Link
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: "#0d47a1" }}
                  to="/login"
                >
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our selection is ever changing. We
                pride ourselves in providing a unique collection of books,
                ensuring there's is always something new to discover here at
                Main Ave. Making the perfect collection for our readers is at
                the heart of everything we do.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                We would love to know what you have been reading. Whether it is
                to learn a new skill or simply unwinding, we can provide top
                content for your jouney!
              </p>
              {authState?.isAuthenticated ? 
                <Link
                className="btn btn-lg text-white"
                style={{ backgroundColor: "#0d47a1" }}
                to="search"
              >
                Explore top books
              </Link>
              :
              <Link
                className="btn btn-lg text-white"
                style={{ backgroundColor: "#0d47a1" }}
                to="/login"
              >
                Sign up
              </Link>
              }
            </div>
          </div>

          <div className="mt-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>Our collection is always changing!</h1>
              <p className="lead">
                Try to check in daily as our selection is ever changing. We
                pride ourselves in providing a unique collection of books,
                ensuring there is always something new to discover here at Main
                Ave. Making the perfect collection for our readers is at the
                heart of everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
