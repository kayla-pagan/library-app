import React from "react";
import BookModel from "../../models/BookModel";
import { Link } from "react-router-dom";

interface checkoutandReviewBoxProps {
    book: BookModel | undefined;
    mobile: boolean;
    currentLoans: number;
    isAuthenticated: any;
    isCheckedOut: boolean;
    checkoutBook: any;
  }

export default function CheckoutAndReviewBox({
    book, mobile, currentLoans, isAuthenticated, isCheckedOut, checkoutBook}: checkoutandReviewBoxProps): React.ReactElement{
    function buttonRender(){
      if(isAuthenticated){
        if(!isCheckedOut && currentLoans < 5){
            return (
                <button 
                    className="btn btn-lg" 
                    style={{backgroundColor: "#00ba88", color: "#ffffff"}} 
                    onClick={() => checkoutBook()}
                >
                    Checkout
                </button>)
        } else if(isCheckedOut){
            return (<p className="fw-semibold">Book checked out. Enjoy!</p>)
        } else if(!isCheckedOut){
            return (<p style={{color: "#f44336"}}>Too many books checked out.</p>)
        }
      }
      return (
        <Link 
            className="btn btn-lg"
            style={{ backgroundColor: "#2196f3", color: "#ffffff" }} 
            to="/#"
        >
            Sign in
        </Link>
      )
    }
    
    return (
        <div className={mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <span className="fw-semibold">{currentLoans}/5 </span> 
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
                {buttonRender()}
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