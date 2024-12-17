import Book from "./Book";
import tiffanyBookImg from "../assets/book-tiffany-frank.svg";

export default function Carousel() {
  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="text-center">
        <h3>Find your next favorite read here.</h3>
      </div>

      <div
        id="carouselExamples"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              <Book />
              <Book />
              <Book />
            </div>
          </div>

          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book />
              <Book />
              <Book />
            </div>
          </div>

          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <Book />
              <Book />
              <Book />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExamples"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExamples"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* {mobile} */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="text-center d-flex flex-column align-items-center gap-1">
            <img src={tiffanyBookImg} alt="book" width={151} height={233} />
            <a
              className="btn text-white"
              style={{ backgroundColor: "#0d47a1" }}
              href="#"
            >
              Reserve
            </a>
          </div>
        </div>
      </div>
      <div className="home-carousel-title mt-3 text-center">
        <a className="btn btn-outline-secondary btn-lg" href="#">
          View more
        </a>
      </div>
    </div>
  );
}
