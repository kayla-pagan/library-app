import React from "react";
import { MessageModel } from "../../models/MessageModel";

interface pendingAdminMessageProps {
    message: MessageModel;
}

export default function PendingAdminMessage({ message }: pendingAdminMessageProps): React.ReactElement{
    const [displayWarning, setDisplayWarning] = React.useState(false)
    const [response, setResponse] = React.useState("")

    return (
        <div key={message.id}>
            <div className="card mt-2 shadow p-3 bg-body rounded">
                <h5>Case #{message.id}: {message.title}</h5>
                <h6>{message.userEmail}</h6>
                <p>{message.question}</p>
                <hr />
                <div>
                    <h5>Response: </h5>
                    <form action="PUT">
                        {displayWarning && 
                            <div className="alert alert-danger" role="alert">
                                All fields must be filled out.
                            </div>
                        }
                        <div className="col-md-12 mb-3">
                            <label className="form-lebel">Description</label>
                            <textarea 
                                className="form-control" 
                                id="exampleFormControlTextarea1" 
                                rows={3} 
                                onChange={e => setResponse(e.target.value)}
                                value={response}
                            ></textarea>
                        </div>
                        <div>
                            <button 
                                className="btn mt-3 text-white" 
                                style={{ backgroundColor: "#0d47a1" }}
                                type="button"
                            >
                                Submit Response
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}