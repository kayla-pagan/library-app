import BookModel from "../../models/BookModels";
import tiffanyBookImg from "../../assets/book-tiffany-frank.svg";
import { Link } from "react-router-dom";

interface BookProps {
  book: BookModel;
}

export default function Search({ book }: BookProps): React.ReactElement {
  const { id, title, author, description, img } = book;

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {img ? (
              <img src={img} width={123} height={196} alt="Book" />
            ) : (
              <img src={tiffanyBookImg} width={123} height={196} alt="Book" />
            )}
          </div>
        </div>

        {/* mobile */}
        <div className="d-lg-none d-flex justify-content-center align-items-center">
          {img ? (
            <img src={img} width={123} height={196} alt="Book" />
          ) : (
            <img src={tiffanyBookImg} width={123} height={196} alt="Book" />
          )}
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{author}</h5>
            <h4>{title}</h4>
            <p className="card-text">{description}</p>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link
            className="btn btn-md text-white"
            style={{ backgroundColor: "#0d47a1" }}
            to={`/checkout/${id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
