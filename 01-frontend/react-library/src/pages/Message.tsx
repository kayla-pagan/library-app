import React from "react";
import PostNewMessage from "../components/MessagePage/PostNewMessage";

export default function Message(){
    const [messagesClick, setMessagesClick] = React.useState(false)

    return (
        <div className="container">
            <div className="mt-3 mb-2">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button 
                            className="nav-link active" 
                            id="nav-send-message-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-send-message"
                            type="button"
                            role="tab"
                            aria-controls="nav-send-message"
                            aria-selected="true"
                            onClick={() => setMessagesClick(false)}
                        >
                            Submit Question
                        </button>
                        <button
                            className="nav-link"
                            id="nav-message-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-message"
                            type="button"
                            role="tab"
                            aria-controls="nav-message"
                            aria-selected="false"
                            onClick={() => setMessagesClick(true)}
                        >
                            Q/A Response/Pending
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div 
                        className="tab-pane fade show active" 
                        id="nav-send-message" 
                        role="tabpanel" 
                        aria-labelledby="nav-send-message-tab"
                    >
                        <PostNewMessage />
                    </div>
                    <div 
                        className="tab-pane fade" 
                        id="nav-message" 
                        role="tabpanel" 
                        aria-labelledby="nav-message-tab"
                    >
                        {messagesClick ? <p>Messages</p> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}