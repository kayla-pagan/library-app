import React from "react";
import BookModel from "../../models/BookModel";
import tiffanyBookImg from "../../assets/book-tiffany-frank.svg"

interface quantityOfBooksProps {
    book: BookModel;
}

export default function QuantityOfBooks({ book }: quantityOfBooksProps): React.ReactElement{
    const [quantity, setQuantity] = React.useState<number>(0)
    const [remaining, setRemaining] = React.useState<number>(0)

    React.useEffect(() => {
        function fetchBooksInState(){
            book.copies ? setQuantity(book.copies) : setQuantity(0)
            book.copiesAvailable ? setRemaining(book.copiesAvailable) : setRemaining(0)
        }
        fetchBooksInState()
    }, [])

    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {book.img ?
                            <img src={book.img} width={123} height={196} alt="Book" />
                            :
                            <img src={tiffanyBookImg} width={123} height={196} alt="Book" />
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                    {book.img ?
                            <img src={book.img} width={123} height={196} alt="Book" />
                            :
                            <img src={tiffanyBookImg} width={123} height={196} alt="Book" />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{book.author}</h5>
                        <h4>{book.title}</h4>
                        <p className="card-text">{book.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Books Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className="mt-3 mb-1 col-md-1">
                    <div className="d-flex justify-content-start">
                        <button className="btn btn-md text-white" style={{backgroundColor: "#f44336"}}>Delete</button>
                    </div>
                </div>
                <button className="m1 btn btn-md text-white" style={{ backgroundColor: "#0d47a1" }}>Add Quantity</button>
                <button className="m1 btn btn-md text-white" style={{ backgroundColor: "#f3b61f" }}>Decrease Quantity</button>
            </div>
        </div>
    )
}