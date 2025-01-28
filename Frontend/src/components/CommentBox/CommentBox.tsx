import { BookComment } from "../../types/Book"
import avatar from "../../assets/avatar.png";
function CommentBox(props: { comment: BookComment }) {
    const { comment } = props;
    return (
        <div className="w-full h-64 grid justify-center" style={{ gridTemplateColumns: "20% 80%" }}>
            <div className="w-full  h-full flex justify-center flex-col items-center">
                <img
                    alt="avatar-user"
                    src={avatar}
                    className="w-20"
                />
                <h3 className="font-medium text-2xl">{comment?.firstName} {comment?.lastName} </h3>
            </div>
            <div className="w-full flex flex-col  gap-10 p-10">
                <div className="w-20">
                <div className="rating my-2">
                            {
                                [1, 2, 3, 4, 5].map((star, index) => {
                                    const isChecked = star === comment?.rating;
                                    const current = index + 1
                                    return (
                                        <input type="radio" checked={isChecked} key={index} className="mask mask-star" disabled={true} onClick={() => handleStarSelection(current)}/>
                                    )
                                })
                            }
                    </div>
                </div>
                <p>{comment.review}</p>
            </div>
        
        </div>
    )
}

export default CommentBox