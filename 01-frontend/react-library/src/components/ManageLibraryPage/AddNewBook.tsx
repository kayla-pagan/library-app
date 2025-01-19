import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import AddBookRequest from "../../models/AddBookRequest";

export default function AddNewBook() {
  const { authState } = useOktaAuth();
  const apiUrl = ``;
  /* for local development and changes to this project please uncomment the
  variable below 'localUrl' and replace apiUrl on this app with this */
  // const localUrl = `http://localhost:8080`

  // new book state
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [copies, setCopies] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [selectedImagePreview, setSelectedImgPreview] = React.useState<
    string | null
  >(null);

  // display state
  const [displayWarning, setDisplayWarning] = React.useState(false);
  const [displaySuccess, setDisplaySuccess] = React.useState(false);

  function categoryField(value: string) {
    setCategory(value);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImgPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadImageToS3() {
    if (!imageFile) return "";

    const imageUrl = `${apiUrl}/api/admin/secure/upload-url`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: imageFile.name,
        fileType: imageFile.type,
      }),
    };
    const response = await fetch(imageUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const { url } = await response.json();
    await fetch(url, {
      method: "PUT",
      body: imageFile,
      headers: {
        "Content-Type": imageFile.type,
      },
    });

    const uploadUrl = url.split("?")[0]
    console.log("uploaded image url: ", uploadUrl)
    return uploadUrl
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const submitBookUrl = `${apiUrl}/api/admin/secure/add/book`;

    if (
      authState?.isAuthenticated &&
      title !== "" &&
      author !== "" &&
      category !== "select a category" &&
      description !== "" &&
      copies >= 0
    ) {
        setDisplayWarning(false);

        const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category)

        if (imageFile) {
            try {
                const uploadedImageUrl = await uploadImageToS3();
                book.img = uploadedImageUrl
            } catch(error:any) {
                console.error("Image upload failed: ", error)
                setDisplayWarning(true)
                return
            }
        }

        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        };

        const submitBookResponse = await fetch(submitBookUrl, requestOptions);
        if (!submitBookResponse.ok) {
            throw new Error("Something went wrong!");
        }

        setDisplaySuccess(true);
        setTitle("");
        setAuthor("");
        setDescription("");
        setCopies(0);
        setCategory("");
        setImageFile(null);
        setSelectedImgPreview(null);
    } else {
        setDisplayWarning(true)
        setDisplaySuccess(false)
    }
    
  }

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Book added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out
        </div>
      )}

      <div className="card">
        <div className="card-header">Add a new book</div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Author</label>
                <input
                  className="form-control"
                  type="text"
                  name="author"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Category</label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  id="dropdownMenuButton1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category ? category : "select a category"}
                </button>
                <ul
                  className="dropdown-menu"
                  id="addNewBookId"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("fantasy")}
                    >
                      Fantasy
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("health and wellness")}
                    >
                      Health and Wellness
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("horror")}
                    >
                      Horror
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("language")}
                    >
                      Language
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("mystery")}
                    >
                      Mystery
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("poetry")}
                    >
                      Poetry
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("psychology")}
                    >
                      Psychology
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("romance")}
                    >
                      Romance
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("science")}
                    >
                      science
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("science fiction")}
                    >
                      Science Fiction
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        categoryField("technology and programming")
                      }
                    >
                      Technology and Programming
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => categoryField("travel")}
                    >
                      Travel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Copies</label>
              <input
                className="form-control"
                type="number"
                name="copies"
                required
                onChange={(e) => setCopies(Number(e.target.value))}
                value={copies}
              />
            </div>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
            />
            {selectedImagePreview && (
              <img
                src={selectedImagePreview}
                alt="Selected Preview"
                className="img-thumbnail mt-3"
                width={150}
                height={200}
              />
            )}
            <div>
              <button
                className="btn mt-3 text-white"
                style={{ backgroundColor: "#0d47a1" }}
                type="button"
                onClick={handleSubmit}
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
