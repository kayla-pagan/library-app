import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { MessageModel } from "../../models/MessageModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import Pagination from "../../utils/Pagination";
import PendingAdminMessage from "./PendingAdminMessage";
import AdminMessageRequest from "../../models/AdminMessageRequest";

export default function AdminMessages(){
    const { authState } = useOktaAuth()
    
    // loading state
    const [isLoadingMessages, setIsLoadingMessages] = React.useState(false)
    const [httpError, setHttpError] = React.useState(null)

    // message endpoint state
    const [messages, setMessages] = React.useState<MessageModel[]>([])
    const [messagesPerPage] = React.useState(5)

    // pagination
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState(0)

    // recall useEffect
    const [btnSubmit, setBtnSubmit] = React.useState(false)

    React.useEffect(() => {
        async function fetchMessages(){
            setIsLoadingMessages(true)
            try {
                if(authState && authState.isAuthenticated){
                    const adminUserMessagesUrl = `http://localhost:8080/api/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                            "Content-Type": "application/json",
                        }
                    }

                    const adminUserMessagesResponse = await fetch(adminUserMessagesUrl, requestOptions)
                    if(!adminUserMessagesResponse.ok){
                        throw new Error("Something went wrong")
                    }

                    const adminUserMessagesResponseJson = await adminUserMessagesResponse.json()
                    setMessages(adminUserMessagesResponseJson._embedded.messages)
                    setTotalPages(adminUserMessagesResponseJson.page.totalPages)
                }
            } catch (error: any) {
                setHttpError(error.message)
                setIsLoadingMessages(false)
            } finally {
                setIsLoadingMessages(false)
            }
        }

        fetchMessages()
    }, [authState, currentPage, btnSubmit])

    if(isLoadingMessages){
        return (
            <SpinnerLoading />
        )
    }

    if(httpError){
        <div className="container m-5">
            <p>{httpError}</p>
        </div>
    }

    async function handleSubmitResponse(id: number, response: string){
        const submitResponseUrl = `http://localhost:8080/api/messages/secure/admin/message`

        if(authState && authState?.isAuthenticated && id !== null && response !== ""){
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response)
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageAdminRequestModel)
            }
            const submitResponse = await fetch(submitResponseUrl, requestOptions)
            if(!submitResponse.ok){
                throw new Error("Something went wrong!")
            }
            setBtnSubmit(!btnSubmit)
        }
        
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="mt-3">
            {messages.length > 0 ? 
                <>
                    <h5>Pending Q/A: </h5>
                    {messages.map(message => (
                        <PendingAdminMessage message={message} submitResponse={handleSubmitResponse} key={message.id} />
                    ))}
                </>
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    )
}