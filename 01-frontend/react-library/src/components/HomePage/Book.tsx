import tiffanyBookImg from "../../assets/book-tiffany-frank.svg";

export default function Book(){
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="text-center d-flex flex-column align-items-center gap-3">
                  <img
                    src={tiffanyBookImg}
                    alt="book"
                    width={151}
                    height={233}
                  />
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