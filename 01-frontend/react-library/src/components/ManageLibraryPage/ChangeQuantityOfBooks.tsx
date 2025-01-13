import React from "react";
import BookModel from "../../models/BookModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import Pagination from "../../utils/Pagination";
import QuantityOfBooks from "./QuantityOfBooks";

export default function ChangeQuantityOfBooks(){
    const [books, setBooks] = React.useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [httpError, setHttpError] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [booksPerPage] = React.useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);

    React.useEffect(() => {
        async function fetchBooks() {
        setIsLoading(true);
        try {
            const bookUrl: string = `http://localhost:8080/api/books?page=${currentPage - 1}&size=${booksPerPage}`;
    
            const response = await fetch(bookUrl);
    
            if (!response.ok) {
            throw new Error("Something went wrong!");
            }
    
            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
    
            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
    
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
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
        }
    
        fetchBooks();
    }, [currentPage]);

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

    return (
        <div className="container mt-5">
            {totalAmountOfBooks > 0 ?
                <>
                    <div className="mt-3">
                        <h5>Number of Results: ({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook + 1}-{lastItem} of {totalAmountOfBooks} items: 
                    </p>
                    {books.map(book => (
                        <QuantityOfBooks key={book.id} book={book} />
                    ))}
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    )
}