import { useEffect, useState } from "react";
import { auth } from "../firebase";
const Comments = ({auth}) => {
    const [backendComments, setBackendComments] = useState([])

    useEffect(() => {

    }, [])
    return <div>
        Comments
    </div>;
};

export default Comments;