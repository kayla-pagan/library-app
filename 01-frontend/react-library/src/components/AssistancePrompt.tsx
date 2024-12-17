export default function AssistancePrompt() {
  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h1 className="display-4 fw-bold">
            Can't find what you are looking for?
          </h1>
          <p className="lead">
            If you cannot find what you are looking for, please send us a
            personal message!
          </p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
            <a
              className="btn btn-lg text-white"
              style={{ backgroundColor: "#0d47a1" }}
              href="#"
            >
              Sign up
            </a>
          </div>
        </div>

        <div className="col-lg-4 offset-lg-1 shadow-lg lost"></div>
      </div>
    </div>
  );
}
