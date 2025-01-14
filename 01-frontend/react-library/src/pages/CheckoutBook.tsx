import React from "react";
import BookModel from "../models/BookModel";
import SpinnerLoading from "../utils/SpinnerLoading";
import tiffanyBookImg from "../assets/book-tiffany-frank.svg";
import StarReview from "../utils/StarReview";
import CheckoutAndReviewBox from "../components/CheckoutBookPage/CheckoutAndReviewBox";
import ReviewModel from "../models/ReviewModel";
import LatestReviews from "../components/CheckoutBookPage/LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../models/ReviewRequestModel";

export default function CheckoutBook() {
  const { authState } = useOktaAuth();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const [book, setBook] = React.useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = React.useState(false);
  const [httpError, setHttpError] = React.useState(null);

  // review state
  const [reviews, setReviews] = React.useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = React.useState(0);
  const [isLoadingReview, setIsLoadingReview] = React.useState(false);

  const [isReviewLeft, setIsReviewLeft] = React.useState(false)
  const [isLoadingUserReview, setIsLoadingUserReview] = React.useState(false)

  // loans count state
  const [currentLons, setCurrentLoans] = React.useState(0);
  const [isLoadingCurrentLoans, setIsLoadingCurrentLoans] = React.useState(false);

  // is book checked out
  const [isCheckedOut, setIsCheckedOut] = React.useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] =
    React.useState(false);

  const bookId = window.location.pathname.split("/")[2];

  React.useEffect(() => {
    async function fetchBooks() {
      setIsLoadingBook(true);
      try {
        const baseUrl: string = `${apiUrl}/api/books/${bookId}`;

        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJson = await response.json();

        const loadedBook: BookModel = {
          id: responseJson.id,
          title: responseJson.title,
          author: responseJson.author,
          description: responseJson.description,
          copies: responseJson.copies,
          copiesAvailable: responseJson.copiesAvailable,
          category: responseJson.category,
          img: responseJson.img,
        };
        setBook(loadedBook);
      } catch (error: any) {
        setHttpError(error.message);
        setIsLoadingBook(false);
      } finally {
        setIsLoadingBook(false);
      }
    }

    fetchBooks();
  }, [isCheckedOut]);

  React.useEffect(() => {
    async function fetchBookReviews() {
      setIsLoadingReview(true);
      try {
        const reviewUrl: string = `${apiUrl}/api/reviews/search/findByBookId?bookId=${bookId}`;

        const responseReviews = await fetch(reviewUrl);

        if (!responseReviews.ok) {
          throw new Error("Something went wrong!");
        }

        const responseJsonReviews = await responseReviews.json();
        const responseData = await responseJsonReviews._embedded.reviews;
        const loadedReviews: ReviewModel[] = [];
        let weightedStarReviews: number = 0;

        for (const key in responseData) {
          loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            book_id: responseData[key].bookId,
            reviewDescription: responseData[key].reviewDescription,
          });

          weightedStarReviews = weightedStarReviews + responseData[key].rating;
        }

        setReviews(loadedReviews);

        if (loadedReviews) {
          const round = (
            Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
          ).toFixed(1);
          setTotalStars(Number(round));
        }
      } catch (error: any) {
        setHttpError(error.message);
        setIsLoadingReview(false);
      } finally {
        setIsLoadingReview(false);
      }
    }

    fetchBookReviews();
  }, [isReviewLeft]);

  React.useEffect(() => {
    async function fetchUserReview() {
        setIsLoadingUserReview(true)
        try {
            if(authState && authState.isAuthenticated){
                const userReviewUrl = `${apiUrl}/api/reviews/secure/user/book?bookId=${bookId}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json", 
                    }
                }
                const userReviewResponse = await fetch(userReviewUrl, requestOptions)
                if(!userReviewResponse.ok){
                    throw new Error("Something went wrong!");
                }
                const userReviewResponseJson = await userReviewResponse.json()
                setIsReviewLeft(userReviewResponseJson)
            }
        } catch (error: any) {
            setHttpError(error)
            setIsLoadingUserReview(false)
        } finally {
            setIsLoadingUserReview(false)
        }
    }

    fetchUserReview()
  }, [authState])

  React.useEffect(() => {
    async function fetchCurrentLoans() {
      setIsLoadingCurrentLoans(true);
      try {
        if (authState && authState.isAuthenticated) {
          const loansUrl = `${apiUrl}/api/books/secure/currentloans/count`;
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const currentLoansResponse = await fetch(loansUrl, requestOptions);
          if (!currentLoansResponse.ok) {
            throw new Error("Something went wrong!");
          }

          const currentLoansResponseJson = await currentLoansResponse.json();
          setCurrentLoans(currentLoansResponseJson);
        }
      } catch (error: any) {
        setHttpError(error.message);
        setIsLoadingCurrentLoans(false);
      } finally {
        setIsLoadingCurrentLoans(false);
      }
    }

    fetchCurrentLoans();
  }, [authState, isCheckedOut]);

  React.useEffect(() => {
    async function fetchIsBookCheckedOut() {
      setIsLoadingBookCheckedOut(true);
      try {
        if (authState && authState.isAuthenticated) {
          const isCheckedOutUrl = `${apiUrl}/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const bookCheckedOut = await fetch(isCheckedOutUrl, requestOptions);
          if (!bookCheckedOut.ok) {
            throw new Error("Something went wrong!");
          }

          const bookCheckedOutResponseJson = await bookCheckedOut.json();
          setIsCheckedOut(bookCheckedOutResponseJson);
        }
      } catch (error: any) {
        setHttpError(error);
        setIsLoadingBookCheckedOut(false);
      } finally {
        setIsLoadingBookCheckedOut(false);
      }
    }

    fetchIsBookCheckedOut();
  }, [authState]);

  if (
    isLoadingBook || isLoadingReview || isLoadingCurrentLoans || isLoadingBookCheckedOut || isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const checkoutUrl = `${apiUrl}/api/books/secure/checkout?bookId=${book?.id}`
    const requestOptions = {
        method: 'PUT', 
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
        }
    }
    try {
        const checkoutResponse = await fetch(checkoutUrl, requestOptions);
        if (!checkoutResponse.ok) {
            const errorBody = await checkoutResponse.text();
            console.error("Error Response Body:", errorBody);
            throw new Error("Something went wrong!");
        }
        console.log("Checkout successful:", await checkoutResponse.json());
        setIsCheckedOut(true);
    } catch (error: any) {
        console.error("Checkout Error:", error.message);
    }
  }

  async function submitReview(starInput: number, reviewDescription: string) {
    let bookId: number = 0
    if(book?.id) {
        bookId = book.id
    }
    const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription)
    const submitReviewUrl = `${apiUrl}/api/reviews/secure`
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewRequestModel)
    }
    const submitReviewResponse = await fetch(submitReviewUrl, requestOptions)
    if(!submitReviewResponse.ok){
        throw new Error("Something went wrong!");
    }
    setIsReviewLeft(true)
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width={226} height={349} alt="Book" />
            ) : (
              <img src={tiffanyBookImg} width={226} height={349} alt="Book" />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 style={{ color: "#2196f3" }}>{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoans={currentLons}
            isAuthenticated={authState?.isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>

      {/* mobile */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width={226} height={349} alt="Book" />
          ) : (
            <img src={tiffanyBookImg} width={226} height={349} alt="Book" />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 style={{ color: "#2196f3" }}>{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarReview rating={totalStars} size={32} />
          </div>
        </div>
        <CheckoutAndReviewBox
          book={book}
          mobile={true}
          currentLoans={currentLons}
          isAuthenticated={authState?.isAuthenticated}
          isCheckedOut={isCheckedOut}
          checkoutBook={checkoutBook}
          isReviewLeft={isReviewLeft}
          submitReview={submitReview}
        />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
}
