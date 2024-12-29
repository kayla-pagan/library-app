import { Link } from "react-router-dom";
import ReviewModel from "../../models/ReviewModel"
import Review from "../../utils/Review";

interface latestReviewsProps{
    reviews: ReviewModel[];
    bookId: number | undefined;
    mobile: boolean;
}

export default function LatestReviews({reviews, bookId, mobile}: latestReviewsProps): React.ReactElement{
    return (
        <div className={mobile ? "mt-3" : "row mt-5"}>
            <div className={mobile ? "" : "col-sm-2 col-md-2"}>
                <h3>Latest Reviews: </h3>
            </div>
            <div className="col-sm-10 col-md-10">
                {reviews.length > 0 ?
                    <>
                      {reviews.slice(0, 3).map(review => (
                        <Review review={review} key={review.id} />
                      ))}

                      <div className="m-3">
                        <Link 
                            className="btn btn-md text-white" 
                            style={{ backgroundColor: "#0d47a1" }}
                            type="button"
                            to="#"
                        >
                            Reach all reviews
                        </Link>
                      </div>
                    </>
                    :
                    <div className="m-3">
                        <p className="lead">
                            There are currently no reviews for this book...
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}