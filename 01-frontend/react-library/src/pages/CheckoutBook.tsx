import React from "react"
import BookModel from "../models/BookModel"
import SpinnerLoading from "../utils/SpinnerLoading"
import tiffanyBookImg from "../assets/book-tiffany-frank.svg"
import StarReview from "../utils/StarReview"
import CheckoutAndReviewBox from "../components/CheckoutBookPage/CheckoutAndReviewBox"
import ReviewModel from "../models/ReviewModel"
import LatestReviews from "../components/CheckoutBookPage/LatestReviews"

export default function CheckoutBook(){
    const [book, setBook] = React.useState<BookModel>()
    const [isLoadingBook, setIsLoadingBook] = React.useState(false)
    const [httpError, setHttpError] = React.useState(null)

    // review state
    const [reviews, setReviews] = React.useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = React.useState(0)
    const [isLoadingReview, setIsLoadingReview] = React.useState(false)

    const bookId = (window.location.pathname).split("/")[2]

    React.useEffect(() => {
        async function fetchBooks() {
        setIsLoadingBook(true);
          try {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
            
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
            }
            setBook(loadedBook);
          } catch (error: any) {
            setHttpError(error.message);
          } finally {
            setIsLoadingBook(false);
          }
        }
    
        fetchBooks();
      }, []);

      React.useEffect(() => {
        async function fetchBookReviews(){
            setIsLoadingReview(true)
            try{
                const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`
            
                const responseReviews = await fetch(reviewUrl)

                if(!responseReviews.ok){
                    throw new Error("Something went wrong!")
                }

                const responseJsonReviews = await responseReviews.json()
                const responseData = await responseJsonReviews._embedded.reviews
                const loadedReviews: ReviewModel[] = []
                let weightedStarReviews: number = 0

                for(const key in responseData){
                    loadedReviews.push({
                        id: responseData[key].id,
                        userEmail: responseData[key].userEmail,
                        date: responseData[key].date,
                        rating: responseData[key].rating,
                        book_id: responseData[key].bookId,
                        reviewDescription: responseData[key].reviewDescription
                    })

                    weightedStarReviews = weightedStarReviews + responseData[key].rating
                }

                setReviews(loadedReviews)

                if(loadedReviews){
                    const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1)
                    setTotalStars(Number(round))
                }

            } catch(error: any){
                setHttpError(error.message)

            } finally {
                setIsLoadingReview(false)
            }


        }

        fetchBookReviews()
      }, [])

    if (isLoadingBook || isLoadingReview) {
        return (
            <SpinnerLoading />
        );
    }
    
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }
    
    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ? 
                            <img src={book?.img} width={226} height={349} alt="Book" /> 
                            :
                            <img src={tiffanyBookImg} width={226} height={349} alt="Book" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 style={{ color: "#2196f3" }}>{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>

            {/* mobile */}
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ? 
                        <img src={book?.img} width={226} height={349} alt="Book" /> 
                        :
                        <img src={tiffanyBookImg} width={226} height={349} alt="Book" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 style={{ color: "#2196f3" }}>{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    )
}