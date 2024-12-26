import React from "react"
import BookModel from "../models/BookModels";
import SpinnerLoading from "../utils/SpinnerLoading";
import Search from "../components/SearchBooksPage/Search";

export default function SearchBooks(){
    const [books, setBooks] = React.useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [httpError, setHttpError] = React.useState(null);

    React.useEffect(() => {
        async function fetchBooks() {
          setIsLoading(true);
          try {
            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&size=5`;
            const response = await fetch(url);
    
            if (!response.ok) {
              throw new Error("Something went wrong!");
            }
    
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            console.log(responseData);
            const loadedBooks: BookModel[] = responseData.map((book: any) => ({
              id: book.id,
              title: book.title,
              author: book.author,
              description: book.description,
              copies: book.copies,
              copiesAvailable: book.copiesAvailable,
              category: book.category,
              img: book.img,
            }));
            setBooks(loadedBooks);
          } catch (error: any) {
            setHttpError(error.message);
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchBooks();
    }, []);

      if (isLoading) {
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
            <div className="container">
                <div className="row mt-5">
                    <div className="col-6">
                        <div className="d-flex">
                            <input className=
                                "form-control me-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-labelledby="Search"
                            />
                            <button className="btn btn-outline">Search</button>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="dropdown">
                            <button 
                                className="btn btn-secondary dropdown-toggle" 
                                type="button" 
                                id="categoryDropdownMenu" 
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Category
                            </button>

                            <ul className="dropdown-menu" aria-labelledby="categoryDropdownMenu">
                                <li>
                                    <a className="dropdown-item" href="#">All</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Fantasy</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Health and Wellness</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Horror</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Language</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Mystery</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Poetry</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Psychology</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Romance</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Science</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Science Fiction</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Technology and Programming</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Travel</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h5>Number of results: (22)</h5>
                    </div>
                    <p>1-5 of 22 items:</p>

                    {books.map(book => (
                        <Search book={book} key={book.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}