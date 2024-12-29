import React from "react"
import BookModel from "../models/BookModels"
import SpinnerLoading from "../utils/SpinnerLoading"
import tiffanyBookImg from "../assets/book-tiffany-frank.svg"

export default function CheckoutBook(){
    const [book, setBook] = React.useState<BookModel>()
    const [isLoadingBook, setIsLoadingBook] = React.useState(false)
    const [httpError, setHttpError] = React.useState(null)

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

    if (isLoadingBook) {
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
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                        </div>
                    </div>
                </div>
                <hr />
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
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}