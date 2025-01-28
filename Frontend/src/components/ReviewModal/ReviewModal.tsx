import { useEffect, useRef, useState } from "react";
import { addToCollectionInput, bookOpinion } from "../../types/Form";
import { toast, ToastContainer } from "react-toastify";
import { updateBookReview } from "../../services/BookService";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

function ReviewModal(props: { dataOpinion: addToCollectionInput, modalRef: any, headerValue: string, status }) {

    const { modalRef, dataOpinion, headerValue, status } = props

    const confirmationModal = useRef(null);
    
    const [form, setForm] = useState<bookOpinion>({
        rating: 0,
        review: ""
    });

    // Fix consistency in dataOpinion and form. Use both? or keep one?

    useEffect(() => {
        setForm({
            rating: dataOpinion?.data.rating,
            review: dataOpinion?.data.review
        })

    }, [dataOpinion])

    // Use the modal component with variants.
    const textInputRef = useRef<HTMLImageElement>(null);


    const closeModal = () => {
        modalRef.current?.close();
        textInputRef.current?.classList?.remove('active');
    }

    const transformTextArea = () => {
        textInputRef.current?.classList.add('active');
    }

    

    const handleUpdateBookToCollection = async (event: React.FormEvent<HTMLFormElement>) => {
        try {

            event.preventDefault()
            let data: addToCollectionInput = {
                bookId: dataOpinion.bookId as string,
                rating: form.rating,
                review: form.review
            };
            const response = await updateBookReview(headerValue, data);
            status(false, true  );
            toast.success(response.message)

        } catch (e: any) {
            toast.error(e?.response?.data?.message);
        }
    }

    const handleStarSelection = (stars: number) =>{
        setForm({
            ...form,
            rating: stars
        })
    }
    const openModal = () =>{
        confirmationModal?.current?.showModal();
    }

    return (

        <dialog id="add_book_modal" className="modal" ref={modalRef}>
            <ToastContainer/>
            <div className="modal-box min-w-fit p-10">
                <form action="" className="h-full w-full bg-slate-50 flex flex-col gap-10  items-center p-12" onSubmit={(event) => handleUpdateBookToCollection(event)}>
                    <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                    <h3 className="font-bold text-lg">YOUR REVIEW</h3>
                    <div className="bg-slate-200 w-full h-20 rounded-lg flex items-center flex-col p-2">
                        <p>Rating</p>
                        <div className="rating my-2">
                            {
                                [1, 2, 3, 4, 5].map((star, index) => {
                                    const isChecked = star === dataOpinion?.data.rating;
                                    const current = index + 1
                                    return (
                                        <input type="radio" checked={isChecked} key={index} className="mask mask-star" onClick={() => handleStarSelection(current)}/>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <textarea
                        ref={textInputRef}
                        value={form.review}
                        onClick={transformTextArea}
                        onChange={(e) => setForm({
                            ...form,
                            review: e.target.value
                        })}
                        placeholder="Write a review..."
                        className="input input-bordered input-primary w-full h-14 flex text-wrap p-2 resize-none">

                    </textarea>
                    <div className="flex gap-2">
                        <button type="submit" className="btn btn-primary w-40">Update </button>
                        <button type="button" className="btn btn-error w-40" onClick={openModal}>Delete </button>
                    </div>
                </form>
            </div>
            <ConfirmationModal modalRef={confirmationModal}  id={dataOpinion?.bookId} headerValue={headerValue} status={status}/>
        </dialog>
    )
}

export default ReviewModal