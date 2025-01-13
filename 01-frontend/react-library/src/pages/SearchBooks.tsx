import React from "react";
import BookModel from "../models/BookModel";
import SpinnerLoading from "../utils/SpinnerLoading";
import Search from "../components/SearchBooksPage/Search";
import Pagination from "../utils/Pagination";

export default function SearchBooks() {
  const [books, setBooks] = React.useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [httpError, setHttpError] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [booksPerPage] = React.useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [searchUrl, setSearchUrl] = React.useState("");
  const [categorySelection, setCategorySelection] = React.useState("Book category")

  React.useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
      try {
        const baseUrl: string = "http://localhost:8080/api/books";
        let url: string = "";

        if (searchUrl === "") {
          url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
        } else {
          let searchWithPage = searchUrl.replace("<pageNumber>", `${currentPage - 1}`)
          url = baseUrl + searchWithPage;
        }

        const response = await fetch(url);

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
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  function handleSearchChange() {
    setCurrentPage(1);

    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
    setCategorySelection("Book Category")
  }

  function handleCategoryChange(value: string){
    const validCategories = [
        "fantasy",
        "health and wellness",
        "horror",
        "language",
        "mystery",
        "poetry",
        "psychology",
        "romance",
        "science",
        "science fiction",
        "technology and programming",
        "travel"
    ]

    setCurrentPage(1)
    
    if(validCategories.includes(value.toLowerCase())){
        setCategorySelection(value)
        setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
    } else {
        setCategorySelection("All")
        setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
    }
  }

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-6">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-labelledby="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearchChange} className="btn btn-outline">
                Search
              </button>
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
                {categorySelection}
              </button>

              <ul
                className="dropdown-menu"
                aria-labelledby="categoryDropdownMenu"
              >
                <li onClick={() => handleCategoryChange("All")}>
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Fantasy")}>
                  <a className="dropdown-item" href="#">
                    Fantasy
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Health and Wellness")}>
                  <a className="dropdown-item" href="#">
                    Health and Wellness
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Horror")}>
                  <a className="dropdown-item" href="#">
                    Horror
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Language")}>
                  <a className="dropdown-item" href="#">
                    Language
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Mystery")}>
                  <a className="dropdown-item" href="#">
                    Mystery
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Poetry")}>
                  <a className="dropdown-item" href="#">
                    Poetry
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Psychology")}>
                  <a className="dropdown-item" href="#">
                    Psychology
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Romance")}>
                  <a className="dropdown-item" href="#">
                    Romance
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Science")}>
                  <a className="dropdown-item" href="#">
                    Science
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Science Fiction")}>
                  <a className="dropdown-item" href="#">
                    Science Fiction
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Technology and Programming")}>
                  <a className="dropdown-item" href="#">
                    Technology and Programming
                  </a>
                </li>
                <li onClick={() => handleCategoryChange("Travel")}>
                  <a className="dropdown-item" href="#">
                    Travel
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {totalAmountOfBooks > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of results: ({totalAmountOfBooks})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1}-{lastItem} of {totalAmountOfBooks} items:
              </p>
              {books.map((book) => (
                <Search book={book} key={book.id} />
              ))}{" "}
            </>
          ) : (
            <div className="m-5">
              <h3>Can't find what you are searching for?</h3>
              <a
                className="btn btn-md px-4 me-md-2 fw-bold text-white"
                style={{ backgroundColor: "#0d47a1" }}
                type="button"
                href="#"
              >
                Contact us
              </a>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
