export default function Hero(){
    return (
        <div className="p-5 mb-4 bg-dark hero">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">Your aventure starts here</h1>
                    <p className="col-md-8 fs-4">Turn the page to discover where you'll go next</p>
                    <a type="button" className="btn btn-lg text-white explore-btn" href="#" style={{backgroundColor: '#0d47a1'}}>Explore top reads</a>
                </div>
            </div>
        </div>
    )
}