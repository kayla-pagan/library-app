import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import ShelfCurrentLoans from "../../models/ShelfCurrentLoans";
import SpinnerLoading from "../../utils/SpinnerLoading";
import tiffanyBookImg from "../../assets/book-tiffany-frank.svg";
import { Link } from "react-router-dom";
import LoansModal from "./LoansModal";

export default function Loans() {
  const { authState } = useOktaAuth();
  const apiUrl = ``;
  /* for local development and changes to this project please uncomment the
  variable below 'localUrl' and replace apiUrl on this app with this */
  // const localUrl = `http://localhost:8080`

  const [httpError, setHttpError] = React.useState(null);

  // current loans state
  const [shelfCurrentLoans, setShelfCurrentLoans] = React.useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false)

  React.useEffect(() => {
    async function fetchUserCurrentLoans() {
      setIsLoadingUserLoans(true);
      try {
        if (authState && authState.isAuthenticated) {
          const shelfCurrentLoansUrl = `${apiUrl}/api/books/secure/currentloans`;
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const shelfCurrentLoansResponse = await fetch(
            shelfCurrentLoansUrl,
            requestOptions
          );
          if (!shelfCurrentLoansResponse.ok) {
            throw new Error("Something went wrong!");
          }

          const shelfCurrentLoansResponseJson =
            await shelfCurrentLoansResponse.json();
          setShelfCurrentLoans(shelfCurrentLoansResponseJson);
        }
      } catch (error: any) {
        setHttpError(error);
        setIsLoadingUserLoans(false);
      } finally {
        setIsLoadingUserLoans(false);
      }
    }
    fetchUserCurrentLoans();
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  if (isLoadingUserLoans) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const returnBookUrl = `${apiUrl}/api/books/secure/return?bookId=${bookId}`
    const requestOptions = {
        method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json",
            },
    }
    const requestBookResponse = await fetch(returnBookUrl, requestOptions)
    if(!requestBookResponse.ok){
        throw new Error("Something went wrong!")
    }

    setCheckout(!checkout)
  }

  async function renewLoan(bookId: number) {
    const renewLoanUrl = `${apiUrl}/api/books/secure/renew/loan?bookId=${bookId}`
    const requestOptions = {
        method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json",
            },
    }
    const renewLoanResponse = await fetch(renewLoanUrl, requestOptions)
    if(!renewLoanResponse.ok){
        throw new Error("Something went wrong!")
    }

    setCheckout(!checkout)
  }

  return (
    <div>
      {/* desktop */}
      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current Loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {shelfCurrentLoan.book?.img ? (
                      <img
                        src={shelfCurrentLoan.book.img}
                        width={226}
                        height={349}
                        alt="Book"
                      />
                    ) : (
                      <img
                        src={tiffanyBookImg}
                        width={226}
                        height={349}
                        alt="Book"
                      />
                    )}
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft === 0 && (
                          <p style={{ color: "#00ba88" }}>Due today.</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            className="list-group-item list-group-item-action"
                            to={"/search"}
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help others find their adventure by reviewing your loan.
                      </p>
                      <Link
                        className="btn text-white"
                        style={{ backgroundColor: "#0d47a1" }}
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={false} returnBook={returnBook} renewLoan={renewLoan} />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link
              className="btn text-white"
              style={{ backgroundColor: "#0d47a1" }}
              to={"search"}
            >
              Search for a new book
            </Link>
          </>
        )}
      </div>

      {/* mobile */}
      <div className="container d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current Loans: </h5>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <div key={shelfCurrentLoan.book.id}>
                  <div className="d-flex justify-content-center align-items-center">
                    {shelfCurrentLoan.book?.img ? (
                      <img
                        src={shelfCurrentLoan.book.img}
                        width={226}
                        height={349}
                        alt="Book"
                      />
                    ) : (
                      <img
                        src={tiffanyBookImg}
                        width={226}
                        height={349}
                        alt="Book"
                      />
                    )}
                  </div>
                  <div className="card d-flex mt-5 mb-3">
                    <div className="container card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {shelfCurrentLoan.daysLeft > 0 && (
                          <p className="text-secondary">
                            Due in {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        {shelfCurrentLoan.daysLeft === 0 && (
                          <p style={{ color: "#00ba88" }}>Due today.</p>
                        )}
                        {shelfCurrentLoan.daysLeft < 0 && (
                          <p className="text-danger">
                            Past due by {shelfCurrentLoan.daysLeft} days.
                          </p>
                        )}
                        <div className="list-group mt-3">
                          <button
                            className="list-group-item list-group-item-action"
                            aria-current="true"
                            data-bs-toggle="modal"
                            data-bs-target={`#mobilemodal${shelfCurrentLoan.book.id}`}
                          >
                            Manage Loan
                          </button>
                          <Link
                            className="list-group-item list-group-item-action"
                            to={"/search"}
                          >
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">
                        Help others find their adventure by reviewing your loan.
                      </p>
                      <Link
                        className="btn text-white"
                        style={{ backgroundColor: "#0d47a1" }}
                        to={`/checkout/${shelfCurrentLoan.book.id}`}
                      >
                        Leave a review
                      </Link>
                    </div>
                  </div>
                <hr />
                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile={true} returnBook={returnBook} renewLoan={renewLoan} />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link
              className="btn text-white"
              style={{ backgroundColor: "#0d47a1" }}
              to={"search"}
            >
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
