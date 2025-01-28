import { useEffect, useRef, useState } from "react"
import Header from "../../components/Header/Header"
import { useAuth } from "../../Hooks/UseAuth";
import { getBookOpion, getUserCollection } from "../../services/BookService";
import BookCard from "../../components/BookCard/BookCard";
import { BooksIncollection } from "../../types/Book";
import { addToCollectionInput } from "../../types/Form";
import { useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ReviewModal from "../../components/ReviewModal/ReviewModal";





function Collection() {

  const [response, setResponse] = useState<BooksIncollection>();
  const { token } = useAuth();
  const headerValue = `Bearer ${token}`
  const [dataOpinion, setdataOpinion] = useState<addToCollectionInput>();
  const [searchParams] = useSearchParams();
  const modalRef = useRef(null);
  

  const [status, setStatus] = useState({
    deleted: false,
    updated: false
  })


  const updateStatus = (deleted: boolean, updated:boolean) =>{
      setStatus({deleted: deleted, updated: updated})
  }


  useEffect(() => {
    getTheUserCollection();
  }, [])

  
  useEffect(()=>{
    getTheUserCollection();
    updateStatus(false, false);
  }, [status.deleted, status.updated])


  const getTheUserCollection = async () => {
    const responseV = await getUserCollection(headerValue, searchParams.get('page'));
    console.log(searchParams.get('page'))
    setResponse(responseV);
  }



  // Get the book in the collection

  const getBookOpinionByUser = async (id: string | null) => {
    modalRef?.current?.showModal();
    
    const response = await getBookOpion(headerValue, id);
    
    setdataOpinion({
      ...response,
      bookId: id
    });
    
  }



  return (
    <>
      <Header variant="info" />
      <div className="wrapper p-10">
        <h1 className="text-4xl p-4">Hi, welcome to your collection</h1>
        <div className="divider"></div>
        {/* Modal */}
          <ReviewModal dataOpinion={dataOpinion as addToCollectionInput} headerValue={headerValue} modalRef={modalRef} status={updateStatus}/>
        <section className="flex h-full flex-wrap gap-10" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem" }}>
          {
            response?.data.books.map((book, index) => (
              <div onClick={() => getBookOpinionByUser(book.id)}>
                <BookCard key={index} books={book} />
              </div>
            ))
          }
        </section>
        <div className="w-full flex items-center justify-center">
          <div className="join grid grid-cols-2 w-1/2 items-center justify-center">
            <button className="join-item btn btn-outline" onClick={() => window.location.href = response?.data.links.prev} disabled={!response?.data.links.prev}>Previous page</button>
            <button className="join-item btn btn-outline" onClick={() => window.location.href = response?.data.links.next} disabled={!response?.data.links.next}>Next</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Collection