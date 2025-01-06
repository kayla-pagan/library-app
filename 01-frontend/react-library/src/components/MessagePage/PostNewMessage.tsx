import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { MessageModel } from "../../models/MessageModel";

export default function PostNewMessage(){
    const { authState } = useOktaAuth()
    const [title, setTitle] = React.useState("")
    const [question, setQuestion] = React.useState("")
    const [displayWarning, setDisplayWarning] = React.useState(false)
    const [displaySuccess, setDisplaySuccess] = React.useState(false)

    async function handleSubmitNewQuestion() {
        const submitQuestionUrl = `http://localhost:8080/api/messages/secure/add/message`

        if(authState?.isAuthenticated && title !== "" && question !== ""){
            const messageRequestModel: MessageModel = new MessageModel(title, question)
            const requestOptions = {
                method: 'POST',
                headers : {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageRequestModel)
            }

            const submitQuestionResponse = await fetch(submitQuestionUrl, requestOptions)
            if(!submitQuestionResponse.ok){
                throw new Error("Something went wrong!")
            }

            setTitle("")
            setQuestion("")
            setDisplayWarning(false)
            setDisplaySuccess(true)
        } else {
            setDisplayWarning(true)
            setDisplaySuccess(false)
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-header">
                Ask question to Main Ave Books team
            </div>
            <div className="card-body">
                <form method="POST">
                    {displayWarning &&
                        <div className="alert alert-danger" role="alert">
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess &&
                        <div className="alert alert-success" role="alert">
                            Question added successfully
                        </div>
                    }
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="exampleFormControlInput" 
                            placeholder="Title" 
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Question</label>
                        <textarea 
                            className="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows={3} 
                            onChange={e => setQuestion(e.target.value)}
                            value={question}
                        ></textarea>
                    </div>
                    <div>
                        <button 
                            className="btn text-white mt-3" 
                            style={{ backgroundColor: "#0d47a1" }} 
                            type="button"
                            onClick={handleSubmitNewQuestion}
                        >
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}