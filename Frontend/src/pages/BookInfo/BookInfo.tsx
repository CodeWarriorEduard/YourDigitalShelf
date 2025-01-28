import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { useEffect, useRef, useState } from "react";
import { BookComment, BookCompleteInfo, BookPreview } from "../../types/Book";
import { useAuth } from "../../Hooks/UseAuth";
import AddToCollectionModal from "../../components/AddToCollectionModal/AddToCollectionModal";
import { getBookComments, getBookId, getRecommendations } from "../../services/BookService";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import CommentBox from "../../components/CommentBox/CommentBox";


function BookInfo() {

    const params = useParams();
    const [response, setResponse] = useState<BookCompleteInfo>();
    const { token } = useAuth();
    const [recommendations, setRecommendations] = useState<BookPreview[]>();
    const [comments, setComments] = useState<BookComment[]>();
    const headerValue = `Bearer ${token}`
    const confirmationModal = useRef(null);

    useEffect(() => {
        getABook(params.id);
        getRecommendationsByBook();
        getUserBookComments();
    }, [])

    useEffect(() => {
        getABook(params.id);
        getRecommendationsByBook();
        getUserBookComments();
    }, [params.id])


    const getABook = async (id: string | undefined) => {
        const bookInfo = await getBookId(id, headerValue);
        setResponse(bookInfo.data);
        console.log(response?.meanRating)
    }

    const getRecommendationsByBook = async () => {
        const response = await getRecommendations(headerValue, params.id);
        setRecommendations(response.data);
    }

    const openModal = () => {
        confirmationModal?.current?.showModal();
    }

    const getUserBookComments = async () => {
        const response = await getBookComments(headerValue, params.id!);
        setComments(response.data);
    }

  
    

    return (
        <>
            <Header variant={"info"} />
            <ToastContainer />
            <div className="wrapper flex flex-col justify-between gap-10 my-10 shadow-lg">

                <div className=" grid justify-between gap-10 p-10" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                    <div className="w-full flex justify-center items-center  rounded-lg">
                        <img src={response?.cover} alt="book-cover" className="w-3/2 h-1/2 bg-white" />
                    </div>
                    <div className="flex flex-row  w-full gap-10">
                        <div>
                            <div>
                                <h1 className="text-6xl font-semibold">{response?.title}</h1>
                                <p className="text-2xl font-semibold my-10 text-gray-700">{response?.author}</p>
                                <div className="flex items-center gap-4">
                                    <div className="rating my-2">
                                        {
                                            [1, 2, 3, 4, 5].map((star, index) => {
                                                const isChecked = star === response?.meanRating;
                                                const current = index + 1
                                                return (
                                                    <input type="radio" checked={isChecked} key={index} className="mask mask-star" onClick={() => handleStarSelection(current)} />
                                                )
                                            })
                                        }
                                    </div>
                                    <p className="flex items-center"><p className="text-lg">{response?.meanRating}</p>/5.0</p>
                                    <p>From {response?.numberOfRatings} ratings</p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-14">
                                    <p className="font-medium flex flex-col">PUBLISHER <p>{response?.publisher}</p></p>
                                    <p className="font-medium flex flex-col">GENRE
                                        <p>{response?.genre}</p>
                                    </p>
                                </div>
                                <h4 className="text-lg font-semibold">About this book:</h4>
                                <p className="h-60 overflow-hidden">{response?.description}</p>
                            </div>
                            {
                                !response?.inCollection ? (
                                    <button className="btn btn-primary w-40 text-white my-10" onClick={() => document.getElementById('add_book_modal').showModal()}>Add To Collection</button>
                                ) : (
                                    <button className="btn btn-warning w-50 text-white my-10" onClick={openModal}>Delete From Collection</button>
                                )

                            }
                            <AddToCollectionModal headerValue={headerValue} />
                            <ConfirmationModal modalRef={confirmationModal} id={params?.id} headerValue={headerValue} status={null} />
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="wrapper flex gap-10 flex-col">
                    <h3 className="text-4xl font-semibold">More books like this: </h3>
                    <div className="flex flex-row flex-wrap w-full h-full justify-evenly" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem" }}>
                        {
                            recommendations?.map((book, j) => (
                                <Link to={`/info/${book.id}` }><BookCard key={j} books={book} /></Link>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h3 className="text-4xl font-semibold">Reviews</h3>
                    {
                        comments?.length == 0? (
                            <h1 className="text-center text-4xl my-10">NO COMMETS YET</h1>
                        ):(
                            comments?.map((comment, idx) => (
                                <>
                                    <CommentBox comment={comment} />
                                    <div className="divider"></div>
                                </>
                            ))
                        )
                        
                       
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BookInfo