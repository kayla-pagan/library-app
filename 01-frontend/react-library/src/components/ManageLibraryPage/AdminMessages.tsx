import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { MessageModel } from "../../models/MessageModel";
import SpinnerLoading from "../../utils/SpinnerLoading";
import Pagination from "../../utils/Pagination";
import PendingAdminMessage from "./PendingAdminMessage";
import AdminMessageRequest from "../../models/AdminMessageRequest";

export default function AdminMessages(){
    const { authState } = useOktaAuth()
    const apiUrl = ``;
    /* for local development and changes to this project please uncomment the
    variable below 'localUrl' and replace apiUrl on this app with this */
    // const localUrl = `http://localhost:8080`
    
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
                    const adminUserMessagesUrl = `${apiUrl}/api/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`
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
        const submitResponseUrl = `${apiUrl}/api/messages/secure/admin/message`

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

    async function handleGenerateReport(){
        try {
            const reportUrl = `${apiUrl}/api/messages/secure/generate-report`
            const requestOptions = {
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                }
            }
            const reportResponse = await fetch(reportUrl, requestOptions)
            if(!reportResponse.ok){
                throw new Error("Failed to generate report")
            }

            const blob = await reportResponse.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", "messages-report.csv")
            document.body.appendChild(link)
            link.click()
            link.remove()
        } catch (error: any) {
            console.error("Error generating report:", error.message)
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="mt-3">
            {messages.length > 0 ? 
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Pending Q/A: </h5>
                        <button 
                            className="btn text-white" 
                            style={{ backgroundColor: "#2196f3" }}
                            onClick={handleGenerateReport}
                        >
                            Generate Report
                        </button>
                    </div>
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