import { useOktaAuth } from "@okta/okta-react"
import React from "react"
import { Navigate } from "react-router-dom"

export default function ManageLibrary(){
    const { authState } = useOktaAuth()
    const [changeQuantityOfBooksClicked, setChangeQuantityOfBooksClicked] = React.useState(false)
    const [messagesClicked, setMessagesClicked] = React.useState(false)

    function addBookClick(){
        setChangeQuantityOfBooksClicked(false)
        setMessagesClicked(false)
    }

    function addChangeQuantityClick(){
        setChangeQuantityOfBooksClicked(true)
        setMessagesClicked(false)
    }

    function addMessageClick(){
        setChangeQuantityOfBooksClicked(false)
        setMessagesClicked(true)
    }

    if(authState?.accessToken?.claims.userType === undefined){
        return <Navigate to={"/"} replace />
    }
    
    return (
        <div className="container">
            <div className="mt-5">
                <h3>Manage Library</h3>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button 
                            className="nav-link active" 
                            id="nav-add-book-tab" 
                            data-bs-toggle="tab" 
                            data-bs-target="#nav-add-book"
                            type="button"
                            role="tab"
                            aria-controls="nav-add-book"
                            aria-selected="false"
                            onClick={addBookClick}
                        >
                            Add new book
                        </button>
                        <button 
                            className="nav-link" 
                            id="nav-quantity-tab" 
                            data-bs-toggle="tab" 
                            data-bs-target="#nav-quantity"
                            type="button"
                            role="tab"
                            aria-controls="nav-quantity"
                            aria-selected="true"
                            onClick={addChangeQuantityClick}
                        >
                            Change quantity
                        </button>
                        <button 
                            className="nav-link" 
                            id="nav-messages-tab" 
                            data-bs-toggle="tab" 
                            data-bs-target="#nav-messages"
                            type="button"
                            role="tab"
                            aria-controls="nav-messages"
                            aria-selected="false"
                            onClick={addMessageClick}
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div 
                        className="tab-pane fade show active" 
                        id="nav-add-book" 
                        role="tabpanel" 
                        aria-labelledby="nav-add-book-tab"
                    >
                        Add new book
                    </div>
                    <div 
                        className="tab-pane fade" 
                        id="nav-quantity" 
                        role="tabpanel" 
                        aria-labelledby="nav-quantity-tab"
                    >
                        {changeQuantityOfBooksClicked ? <>Change Quantity</> : <></>}
                    </div>
                    <div 
                        className="tab-pane fade" 
                        id="nav-messages" 
                        role="tabpanel" 
                        aria-labelledby="nav-messages-tab"
                    >
                        {messagesClicked ? <>Admin Messages</> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}