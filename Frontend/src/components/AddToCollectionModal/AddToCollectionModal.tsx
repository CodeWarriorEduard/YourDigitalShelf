import { addToCollectionInput, bookOpinion } from "../../types/Form";
import { useParams } from "react-router-dom";
import { addBookToCollection } from "../../services/BookService";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from "react";

function AddToCollectionModal(props:{headerValue: string}) {

    const params = useParams();
    const {headerValue} = props

    
    // Test useState with form data.

    const [form, setForm] = useState    <bookOpinion>({
       rating: 0,
       review: ""
    });

    const modalRef = useRef<HTMLImageElement>(null);
    const textInputRef = useRef<HTMLImageElement>(null);


    const closeModal = () => {
        modalRef.current?.close();
        textInputRef.current?.classList?.remove('active');
    }

    const transformTextArea = () => {
        textInputRef.current?.classList.add('active');
    }

    // function to add an specific book to a collection

    const handleBookToCollection = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            let data: addToCollectionInput = {
                bookId: params.id as string,
                rating: form.rating,
                review: form.review
            };
            const response = await addBookToCollection(headerValue, data);
            toast.success(response.message)

        } catch (e:any) {
            toast.error(e?.response?.data?.message );
        }
    }


    return (
        <dialog id="add_book_modal" className="modal" ref={modalRef}>
            <ToastContainer/>
            <div className="modal-box max-w-3xl  ">
                <form action="" className="h-full w-full bg-slate-50 flex flex-col gap-10 p-10 items-center" onSubmit={(event) =>handleBookToCollection(event)}>
                    <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                    <h3 className="font-bold text-lg">Add this book to your collection!</h3>
                    <div className="bg-slate-200 w-full h-20 rounded-lg flex items-center flex-col p-2">
                        <p>Rating</p>
                        <div className="rating my-2">
                            <input type="radio" name="rating-9" className="rating-hidden" />
                            {
                                [1, 2, 3, 4, 5].map((star, index) => {
                                    const current = index + 1
                                    return (
                                        <input type="radio" key={star} className="mask mask-star" onClick={() => setForm({
                                            ...form,
                                            rating: current
                                        })} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <textarea
                        ref={textInputRef}
                        onClick={transformTextArea}
                        onChange={(e)=>{setForm({
                            ...form,
                             review: e.target.value
                        })}}
                        placeholder="Write a review..."
                        className="input input-bordered input-primary w-full h-14 flex text-wrap p-2 resize-none">


                    </textarea>
                    <button type="submit" className="btn btn-primary w-40 text-white">Add To Collection</button>
                </form>
            </div>
        </dialog>
    )
}

export default AddToCollectionModal