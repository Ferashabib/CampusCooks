import { useEffect, useState } from "react";
import {getComments} from "./testApi";
import Comment from "./Comment";

const Comments = ({currentUserId}) => {
    const [backendComments, setBackendComments] = useState([])
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );
    const getReplies = commentId => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId)
        .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };
    console.log('backendComments', backendComments);
    useEffect(() => {
        getComments().then((data) => {
            setBackendComments(data);
        });
    }, []);

    return (
    <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className = "comments-container">
            {
                rootComments.map((rootComment) => (
                    <Comment key={rootComment.id} comment={rootComment} replies={getReplies(rootComment.id)}/>
                ))
            }
        </div>
        
    </div>
    );
};

export default Comments;