import { BookPreview } from "../../types/Book";

function BookCard(props:{ books: BookPreview }) { // Fix type
  

  const {books} = props;

  return (
    <div className="book-card border-400 rounded-lg transform transition-transform duration-200 hover:scale-110 p-4 max-h-fit">
      <img src={books.cover} alt="book-cover" className="w-full h-[300px]" />
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-lg font-bold  h-[3.5rem] break-normal overflow-hidden text-gray-900">{books.title}</h5>
        </a>
        <p className="mb-3 font-normal  dark:text-gray-600 flex gap-1 h-[4.5rem] break-normal overflow-hidden"><p className="font-semibold">By</p>{books.author}</p>
      </div>
    </div>
  )
}

export default BookCard