import { useOktaAuth } from "@okta/okta-react";
import React from "react";

export default function AddNewBook(){
    const { authState } = useOktaAuth()

    // new book state
    const [title, setTitle] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [copies, setCopies] = React.useState(0)
    const [category, setCategory] = React.useState("")
    const [selectedImage, setSelectedImg] = React.useState<any>(null)

    // display state
    const [displayWarning, setDisplayWarning] = React.useState(false)
    const [displaySuccess, setDisplaySuccess] = React.useState(false)

    function categoryField(value: string){
        setCategory(value)
    }

    return (
        <div className="container mt-5 mb-5">
            {displaySuccess &&
                <div className="alert alert-success" role="alert">
                    Book added successfully
                </div>
            }
            {displayWarning &&
                <div className="alert alert-danger" role="alert">
                    All fields must be filled out
                </div>
            }

            <div className="card">
                <div className="card-header">
                    Add a new book
                </div>
                <div className="card-body">
                    <form method="POST">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Title</label>
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    name="title" 
                                    required 
                                    onChange={e => setTitle(e.target.value)} 
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
                                    onChange={e => setAuthor(e.target.value)} 
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
                                <ul className="dropdown-menu" id="addNewBookId" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" onClick={() => categoryField("fantasy")}>Fantasy</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("health and wellness")}>Health and Wellness</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("horror")}>Horror</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("language")}>Language</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("mystery")}>Mystery</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("poetry")}>Poetry</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("psychology")}>Psychology</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("romance")}>Romance</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("science")}>science</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("science fiction")}>Science Fiction</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("technology and programming")}>Technology and Programming</a></li>
                                    <li><a className="dropdown-item" onClick={() => categoryField("travel")}>Travel</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control" 
                                id="exampleFormControlTextarea1" 
                                rows={3}
                                onChange={e => setDescription(e.target.value)}
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
                                    onChange={e => setCopies(Number(e.target.value))} 
                                    value={copies} 
                                />
                        </div>
                        <input type="file" />
                        <div>
                            <button className="btn mt-3 text-white" style={{ backgroundColor: "#0d47a1" }} type="button">
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}