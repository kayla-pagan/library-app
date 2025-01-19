import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import HistoryModel from "../models/HistoryModel";
import SpinnerLoading from "../utils/SpinnerLoading";
import tiffanyBookImg from "../assets/book-tiffany-frank.svg";
import { Link } from "react-router-dom";
import Pagination from "../utils/Pagination";

export default function History(){
    const { authState } = useOktaAuth()
    const apiUrl = ``;
    /* for local development and changes to this project please uncomment the
    variable below 'localUrl' and replace apiUrl on this app with this */
    // const localUrl = `http://localhost:8080`

    const [isLoading, setIsLoading] = React.useState(false)
    const [httpError, setHttpError] = React.useState(null)

    // history state
    const [histories, setHistories] = React.useState<HistoryModel[]>([])

    // pagination
    const [currentPage, setCurrentPage] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState(0)

    React.useEffect(() => {
        async function fetchUserHistory() {
            setIsLoading(true)
            try {
                if(authState && authState.isAuthenticated){
                    const userHistoryUrl = `${apiUrl}/api/histories/search/findBooksByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=5`
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${authState?.accessToken?.accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    }
                    const userHistoryResponse = await fetch(userHistoryUrl, requestOptions)
                    if(!userHistoryResponse.ok){
                        throw new Error("Something went wrong!")
                    }

                    const userHistoryResponseJson = await userHistoryResponse.json()
                    setHistories(userHistoryResponseJson._embedded.histories)
                    setTotalPages(userHistoryResponseJson.page.totalPages)
                }
                
            } catch (error: any) {
                setHttpError(error)
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserHistory()
    },[authState, currentPage])

    if(isLoading){
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
            {histories.length > 0 ?
                <>
                    <h5>Recent History: </h5>

                    {histories.map(history => (
                        <div key={history.id}>
                            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-none d-lg-block">
                                            {history.img ? 
                                                <img src={history.img} width={123} height={196} alt="Book" />
                                                :
                                                <img src={tiffanyBookImg} width={123} height={196} alt="Default" />
                                            }
                                        </div>
                                        <div className="d-lg-none d-flex justify-content-center align-items-center">
                                            {history.img ? 
                                                <img src={history.img} width={123} height={196} alt="Book" />
                                                :
                                                <img src={tiffanyBookImg} width={123} height={196} alt="Default" />
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title">{history.author}</h5>
                                            <h4>{history.title}</h4>
                                            <p className="card-text">{history.description}</p>
                                            <hr />
                                            <p className="card-text">Checked out on: {history.checkoutDate}</p>
                                            <p className="card-text">Returned on: {history.returnedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}   
                </>
                :
                <>
                    <h3 className="mt-4">Currently no history: </h3>
                    <Link 
                        className="btn text-white" 
                        style={{ backgroundColor: "#0d47a1" }}
                        to="/search"
                    >
                        Search for a new book
                    </Link>
                </>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    )
}