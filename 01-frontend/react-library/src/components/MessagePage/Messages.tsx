import { useOktaAuth } from "@okta/okta-react"
import React from "react"
import { MessageModel } from "../../models/MessageModel"
import SpinnerLoading from "../../utils/SpinnerLoading"
import Pagination from "../../utils/Pagination"

export default function Messages(){
    const { authState } = useOktaAuth()
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    const [isLoadingMessages, setIsLoadingMessages] = React.useState(false)
    const [httpError, setHttpError] = React.useState(null)

    // messages
    const [messages, setMessages] = React.useState<MessageModel[]>([])

    // pagination
    const [messagesPerPage] = React.useState(5)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState(0)

    React.useEffect(() => {
        async function fetchUserMessages(){
            try {
                if(authState && authState?.isAuthenticated){
                    const userMessageUrl = `${apiUrl}/api/messages/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=${messagesPerPage}`
                    const requestOptions = {
                        method: 'GET',
                        headers : {
                            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }
                    const userMessageResponse = await fetch(userMessageUrl, requestOptions)
                    if(!userMessageResponse.ok){
                        throw new Error("Something went wrong!")
                    }

                    const userMessageResponseJson = await userMessageResponse.json()
                    setMessages(userMessageResponseJson._embedded.messages)
                    setTotalPages(userMessageResponseJson.page.totalPages)

                }
            } catch (error: any) {
                setHttpError(error.messages)
                setIsLoadingMessages(false)
            } finally {
                setIsLoadingMessages(false)
            }
            window.scrollTo(0, 0)
        }

        fetchUserMessages()
    }, [authState, currentPage])

    if(isLoadingMessages){
        return (
            <SpinnerLoading />
        )
    }

    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
    
    return (
        <div className="mt-2">
            {messages.length > 0 ? 
                <>
                    <h5>Current Q/A: </h5>
                    {messages.map(message => (
                        <div key={message.id}>
                            <div className="card mt-2 shadow p-3 bg-body rounded">
                                <h5>Case #{message.id}: {message.title}</h5>
                                <h6>{message.userEmail}</h6>
                                <p>{message.question}</p>
                                <hr />
                                <div>
                                    <h5>Response</h5>
                                    {message.response && message.adminEmail ? 
                                        <>
                                            <h6>{message.adminEmail} (admin)</h6>
                                            <p>{message.response}</p>
                                        </>
                                        :
                                        <p><i>Pending response from a customer service admin. Please be patient.</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                <h5>All questions you submit will be shown here</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    )
}