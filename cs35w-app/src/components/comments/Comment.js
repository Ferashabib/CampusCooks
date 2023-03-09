import {getAuth} from "firebase/auth";
import CommentForm from "./CommentForm";

const Comment = ({comment, replies, currentUserId, activeComment, setActiveComment, addComment, parentId = null}) => {
    const auth = getAuth();
    const allowReply=Boolean(auth);
    const isReplying = activeComment && activeComment.type === "replying" &&
    activeComment.id === comment.id;
    const replyId = parentId ? parentId : comment.id;
    return (
        <div className="comment">
            <div className ="comment-image-container">
                <img src="userImage.jpg"/>
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">{comment.username}</div>
                    <div>{comment.time}</div>
                </div>
                <div className="comment-text">{comment.body}</div>
                <div className="comment-actions">
                    {allowReply && (<div className="comment-action" onClick={() => 
                    setActiveComment({id: comment.id, type: "replying"})}>Reply</div>)}
                </div>
                {
                    isReplying && (
                        <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, replyId)}
                        />
                    )
                }
                {
                    replies.length > 0 && (
                    <div className="replies">
                        {
                            replies.map((reply) => (
                                <Comment comment={reply} key={reply.id} 
                                replies={[]} currentUserId={currentUserId}
                                addComment={addComment} activeComment={activeComment}
                                setActiveComment={setActiveComment} parentId={comment.id}/>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;