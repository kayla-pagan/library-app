import React from "react";
import BookModel from "../../models/BookModel";
import tiffanyBookImg from "../../assets/book-tiffany-frank.svg"
import { useOktaAuth } from "@okta/okta-react";

interface quantityOfBooksProps {
    book: BookModel;
    deleteBook: any;
}

export default function QuantityOfBooks({ book, deleteBook }: quantityOfBooksProps): React.ReactElement{
    const { authState } = useOktaAuth()
    const apiUrl = ``;
    /* for local development and changes to this project please uncomment the
    variable below 'localUrl' and replace apiUrl on this app with this */
    // const localUrl = `http://localhost:8080`

    const [quantity, setQuantity] = React.useState<number>(0)
    const [remaining, setRemaining] = React.useState<number>(0)

    React.useEffect(() => {
        function fetchBooksInState(){
            book.copies ? setQuantity(book.copies) : setQuantity(0)
            book.copiesAvailable ? setRemaining(book.copiesAvailable) : setRemaining(0)
        }
        fetchBooksInState()
    }, [])

    async function increaseQuantity() {
        const increaseUrl = `${apiUrl}/api/admin/secure/increase/book/quantity?bookId=${book.id}`
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        }

        const increaseResponse = await fetch(increaseUrl, requestOptions)
        if(!increaseResponse.ok){
            throw new Error("Something went wrong!")
        }

        setQuantity(quantity + 1)
        setRemaining(remaining + 1)
    }

    async function decreaseQuantity() {
        const decreaseUrl = `${apiUrl}/api/admin/secure/decrease/book/quantity?bookId=${book.id}`
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        }

        const decreaseResponse = await fetch(decreaseUrl, requestOptions)
        if(!decreaseResponse.ok){
            throw new Error("Something went wrong!")
        }

        setQuantity(quantity - 1)
        setRemaining(remaining - 1)
    }

    async function handleDeleteBook() {
        const deleteUrl = `${apiUrl}/api/admin/secure/delete/book?bookId=${book.id}`
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        }

        const deleteResponse = await fetch(deleteUrl, requestOptions)
        if(!deleteResponse.ok){
            throw new Error("Something went wrong!")
        }

        deleteBook()
    }

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
                        <button 
                            className="btn btn-md text-white" 
                            style={{backgroundColor: "#f44336"}}
                            onClick={handleDeleteBook}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <button 
                    className="m1 btn btn-md text-white" 
                    style={{ backgroundColor: "#0d47a1" }}
                    onClick={increaseQuantity}
                >
                    Add Quantity
                </button>
                <button 
                    className="m1 btn btn-md text-white" 
                    style={{ backgroundColor: "#f3b61f" }}
                    onClick={decreaseQuantity}
                >
                    Decrease Quantity
                </button>
            </div>
        </div>
    )
}