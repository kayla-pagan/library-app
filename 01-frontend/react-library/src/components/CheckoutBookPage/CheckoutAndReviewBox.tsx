import React from "react";
import BookModel from "../../models/BookModels";
import { Link } from "react-router-dom";

interface checkoutandReviewBoxProps {
    book: BookModel | undefined;
    mobile: boolean;
  }

export default function CheckoutAndReviewBox({book, mobile}: checkoutandReviewBoxProps): React.ReactElement{
    return (
        <div className={mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>0/5 </b> 
                        books checked out
                    </p>
                    <hr />
                    {book && book.copiesAvailable && book.copiesAvailable > 0 ? 
                        <h4 style={{ color: "#2196f3" }}>Available</h4>
                        :
                        <h4 className="text-danger">Wait List</h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{book?.copies} </b>
                            copies
                        </p>
                        <p className="col-6 lead">
                            <b>{book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                <Link 
                    className="btn btn-lg"
                    style={{ backgroundColor: "#2196f3", color: "#ffffff" }} 
                    to="/#"
                >
                    Sign in
                </Link>
                <hr />
                <p className="mt-3">
                    This number can change until you have completed your order.
                </p>
                <p>
                    Sign in to leave a review.
                </p>
            </div>
        </div>
    )
}