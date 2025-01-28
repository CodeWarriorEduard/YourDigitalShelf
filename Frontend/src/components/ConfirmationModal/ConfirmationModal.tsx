import { toast, ToastContainer } from "react-toastify";
import { deleteBookInCollection } from "../../services/BookService";

function ConfirmationModal(props: { modalRef: any , id: string | undefined, headerValue: string, status}) {

    const { modalRef, id, headerValue, status} = props;



    const deleteBook = async() =>{
        try{
            const response = await deleteBookInCollection(headerValue, id!);
            status(true, false);
            toast.success(response?.message);
        }catch(e:any){
            toast.error(e?.response?.data?.message);
        }
    }

    return (
        <>
            <ToastContainer/>
            <dialog id="confirmation-modal" ref={modalRef} className="modal">
                <div className="modal-box flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg">Delete this book?</h3>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-10">
                            <button className="btn">NO</button>
                            <button className="btn" onClick={deleteBook}>YES</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}


export default ConfirmationModal;