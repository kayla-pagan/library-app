import tiffanyBookImg from "../../assets/book-tiffany-frank.svg";
import BookModel from "../../models/BookModels";

interface BookProps {
  book: BookModel
}

export default function Book({book}: BookProps): React.ReactElement {
    const {title, author, img} = book

    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="text-center d-flex flex-column align-items-center gap-3">
                  {img ? 
                    <img
                    src={img}
                    alt="book"
                    width={151}
                    height={233}
                    /> 
                    :
                    <img
                      src={tiffanyBookImg}
                      alt="book"
                      width={151}
                      height={233}
                    />
                  }
                  <h6 className="mt-2">{title}</h6>
                  <p>{author}</p>
                  <a
                    className="btn text-white"
                    style={{ backgroundColor: "#0d47a1" }}
                    href="#"
                  >
                    Reserve
                  </a>
                </div>
              </div>
    )
}