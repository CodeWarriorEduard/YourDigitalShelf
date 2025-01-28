import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./styles/landing.styles.css";
import { motion, useScroll } from "motion/react";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import georgeBook from "../../assets/books/1984.jpg";
import crimePunishment from "../../assets/books/crime_punishment.jpg";
import mobyDick from "../../assets/books/moby.jpg";
import donQuixote from "../../assets/books/donquixote.jpg";
import Footer from "../../components/Footer/Footer";


function Landing() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    Aos.init({
      duration: 600,
      offset: 400,
    });
  }, []);

  // books array.

  const booksArray = [
    {
      image: georgeBook,
      name: "1984 By George Owell",
    },
    {
      image: crimePunishment,
      name: "Crime And Punishment by Fyodor Dostoevsky ",
    },
    {
      image: mobyDick,
      name: "Moby Dick Herman Melville",
    },
    {
      image: donQuixote,
      name: "Don Quixote By Miguel De Cervantes",
    },
  ];

  return (
    <>
      <motion.div
        className="progress-bar-landing bg-success "
        style={{ scaleX: scrollYProgress }}
      ></motion.div>
      <div className="hero-landing ">
        <Header variant="landing" />
        <div className="flex flex-col items-center gap-x-12 p-10 wrapper w-[100%] h-[80%]">
          <div className="h-full w-full flex flex-col justify-center  items-center gap-10">
            <motion.h1
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
              className="text-center text-8xl font-bold"
            >
              YOUR DIGITAL SHELF
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1.5 } }}
              while={{ opacity: 1 }}
              className="text-center"
            >
              <h1 className="text-4xl">
                A fun way to manage and rate your favorite books!
              </h1>
              <p className="text-xl">
                Access detailed information on each title, and see what others
                are saying with community-driven ratings and reviews
              </p>
            </motion.div>
            <Link to={"/login"}>
              <button className="btn btn-accent w-80 btn-lg font-semibold text-2xl">
                GET STARTED
              </button>
            </Link>
          </div>
        </div>
      </div>
      <section className="save-book-section bg-secondary">
        <h1 data-aos="fade-up" className="text-center text-8xl font-bold py-32">
          SAVE YOUR FAVORITE BOOKS
        </h1>
        <div className="book-cover-container">
          {booksArray.map((book, idx) => {
            return (
              <div data-aos="fade-up" className="book-cover-card">
                <img
                  className="book-cover-image"
                  key={idx}
                  src={book.image}
                  alt="book-cover"
                />
                <p className="font-semibold text-xl">{book.name}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default Landing;
