import { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../Hooks/UseAuth";
import { BookCompleteInfo, BookPreview } from "../../types/Book";
import { getBookOfTheMonth, getListOfBooks } from "../../services/BookService";
import { ScaleLoader } from "react-spinners";
import BookCard from "../../components/BookCard/BookCard";
import { Link } from "react-router-dom";



function Home() {

  const [booksResponse, setbooksResponse] = useState<BookPreview[]>([]);
  const [bookMonth, setBookMonth] = useState<BookCompleteInfo>();
  const { token } = useAuth();
  const headerValue = `Bearer ${token}`;

  const [loading, setLoading] = useState(false); // React sniper state.

  let bookCategories = [{ genre: "Fiction", books: [] }, { genre: "Science", books: [] }, { genre: "History", books: [] }];

  useEffect(() => {
    getSelectedBookOnMonth();
    getListOfBooksByGenre();
  }, [])

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 1200)
  }, [])



  const getSelectedBookOnMonth = async () => {
    try {
      const response = await getBookOfTheMonth(headerValue);
      setBookMonth(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Corregir tipado.
  const getListOfBooksByGenre = async () => {
    try {
      const booksByCategory = await Promise.all(bookCategories.map(async (data, index) => {
        const booksPerCategory = await getListOfBooks(headerValue, data.genre);
        return { genre: data.genre, books: booksPerCategory }
      }))
      setbooksResponse(booksByCategory);
    } catch (error) {
      throw error;
    }


  }


  // handle search term




  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center h-dvh">
            <ScaleLoader loading={loading} color="#000000" />
          </div>
        ) : (
          <>
            <Header variant="home"/>
            <div className="hero bg-base-200 h-[80vh] p-20">
              <div className="wrapper">
                <h2 className="text-5xl my-10 text-center font-bold">Book Of The Day</h2>
                <div className="hero-content flex-col lg:flex-row">
                  <img
                    src={bookMonth?.cover}
                    className="max-w-sm rounded-lg shadow-2xl" />
                  <div>
                    <h1 className="text-3xl font-medium">{bookMonth?.title}</h1>
                    <p className="text-xl"><strong>{bookMonth?.author}</strong></p>
                    <p className="py-6">
                      {bookMonth?.description}
                    </p>
                    <button className="btn btn-primary">Watch more...</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div>
              <section className="wrapper flex flex-col h-full m-0 p-4 items-center flex-wrap w-full">
                {
                  booksResponse.map((genre, i) => (
                    <div className="gap-2 justify-center  w-full">
                      <h1 className="text-5xl font-semibold">{genre.genre}</h1>
                      <div className="flex flex-row flex-wrap w-full h-full justify-evenly" style={{display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:"1.5rem"}}>
                          {
                             genre.books.data.map((book, j) => (
                              <Link to={`/info/${book.id}`}><BookCard key={j} books={book} /></Link>
                            ))
                           
                          }
                      </div>
                      <div className="divider"></div>
                    </div>
                  ))
                }
                <div className="bg-slate-400">

                </div>
              </section>

            </div>
            <Footer />
          </>
        )
      }


    </>
  )
}

export default Home