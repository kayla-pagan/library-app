import React from "react"
import ReviewModel from "../models/ReviewModel"
import SpinnerLoading from "../utils/SpinnerLoading"
import Review from "../utils/Review"
import Pagination from "../utils/Pagination"

export default function ReviewList(){
  const apiUrl = ``;
  /* for local development and changes to this project please uncomment the
  variable below 'localUrl' and replace apiUrl on this app with this */
  // const localUrl = `http://localhost:8080`

    const [reviews, setReviews] = React.useState<ReviewModel[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [httpError, setHttpError] = React.useState(null)

    // pagination state
    const [currentPage, setCurrentPage] = React.useState(1)
    const [reviewsPerPage] = React.useState(5)
    const [totalAmountOfReviews, setTotalAmountOfReviews] = React.useState(0)
    const [totalPages, setTotalPages] = React.useState(0)

    const bookId = (window.location.pathname).split('/')[2]

    React.useEffect(() => {
        async function fetchBookReviews() {
          setIsLoading(true);
          try {
            const reviewUrl: string = `${apiUrl}/api/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage - 1}&size=${reviewsPerPage}`;
    
            const responseReviews = await fetch(reviewUrl);
    
            if (!responseReviews.ok) {
              throw new Error("Something went wrong!");
            }
    
            const responseJsonReviews = await responseReviews.json();
            const responseData = await responseJsonReviews._embedded.reviews;

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements)
            setTotalPages(responseJsonReviews.page.totalPages)

            const loadedReviews: ReviewModel[] = [];
    
            for (const key in responseData) {
              loadedReviews.push({
                id: responseData[key].id,
                userEmail: responseData[key].userEmail,
                date: responseData[key].date,
                rating: responseData[key].rating,
                book_id: responseData[key].bookId,
                reviewDescription: responseData[key].reviewDescription,
              });
            }
    
            setReviews(loadedReviews);
          } catch (error: any) {
            setHttpError(error.message);
            setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchBookReviews();
      }, [currentPage]);

      if(isLoading){
        return (
            <SpinnerLoading />
        )
      }

      if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
      }

      const indexOfLastReview: number = currentPage * reviewsPerPage
      const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage
      let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews
      const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="container m-5">
            <div>
                <h4>Comments: ({reviews.length})</h4>
            </div>
            <p>{indexOfFirstReview + 1}-{lastItem} of {totalAmountOfReviews} items:</p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id} />
                ))}
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    )
}