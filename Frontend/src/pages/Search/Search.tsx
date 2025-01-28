import { useSearchParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import { useAuth } from "../../Hooks/UseAuth";
import { getBookSearchResponse } from "../../services/BookService";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import BookCard from "../../components/BookCard/BookCard";
import { BookSearchResponse } from "../../types/Book";
import { Link } from "react-router-dom";


function Search() {

    const { token } = useAuth();
    const headerValue = `Bearer ${token}`;
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<BookSearchResponse | any>();


    useEffect(() => {
        getSearchResponse()
    }, [])

    useEffect(() => {
        getSearchResponse()
    }, [searchParams.get('searchTerm')])

    const getSearchResponse = async () => {
        try {
            const response = await getBookSearchResponse(headerValue, searchParams.get('searchTerm'), searchParams.get('page'));
            setData(response);
        } catch (e) {
            throw e;
        }
    }

    return (
        <>
            <Header variant="home" />
            <section className="wrapper flex flex-col h-full w-full p-10">
                <div>
                    <h1 className="text-6xl  font-semibold text-center">SEARCH RESULTS</h1>
                </div>
                <div className="divider"></div>
                <p className="text-lg font-semibold">
                    Showing {data?.data.itemsPerPage} from {data?.data.numberOfResults} results
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {
                        data?.data?.books.map((book, index) => (
                            <Link to={`/info/${book.id}`}><BookCard key={index} books={book} /></Link>
                        ))
                    }
                </div>
                <div className="w-full flex items-center justify-center">
                    <div className="join grid grid-cols-2 w-1/2 items-center justify-center">
                        <button className="join-item btn btn-outline" onClick={() => window.location.href = data?.data.links.prev} disabled={!data?.data.links.prev}>Previous page</button>
                        <button className="join-item btn btn-outline"onClick={() => window.location.href = data?.data.links.next} disabled={!data?.data.links.next}>Next</button>
                    </div>
                </div>
            </section>
            <Footer />

        </>
    )
}

export default Search