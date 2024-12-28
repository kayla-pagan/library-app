import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <div style={{ backgroundColor: "#051939" }}>
            <footer 
                className="container d-flex flex-wrap justify-content-between align-items-center py-5"
                style={{ backgroundColor: "#051939" }}
            >
                <p className="col-md-4 mb-0 text-white">
                    ©  Main Ave Books, Inc
                </p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                   <li className="nav-item">
                        <Link className="nav-link px-2 text-white" to="/">Home</Link>
                    </li> 
                    <li className="nav-item">
                        <Link className="nav-link px-2 text-white" to="/search">Search books</Link>
                    </li> 
                </ul>
            </footer>
        </div>
    )
}