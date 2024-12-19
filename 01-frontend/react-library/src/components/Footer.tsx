export default function Footer(){
    return (
        <div style={{ backgroundColor: "#0d47a1" }}>
            <footer 
                className="container d-flex flex-wrap justify-content-between align-items-center py-5"
                style={{ backgroundColor: "#0d47a1" }}
            >
                <p className="col-md-4 mb-0 text-white">
                    ©  Main Ave Books, Inc
                </p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                   <li className="nav-item">
                        <a className="nav-link px-2 text-white" href="#">Home</a>
                    </li> 
                    <li className="nav-item">
                        <a className="nav-link px-2 text-white" href="#">Search books</a>
                    </li> 
                </ul>
            </footer>
        </div>
    )
}