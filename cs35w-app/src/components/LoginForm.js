import handleSubmit from '../handles/handlesubmit';
import { useRef } from 'react';
import { getDatabase, ref, set } from "firebase/database";

// function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//         username: name,
//         email: email,
//         profile_picture: imageUrl
//     });
// }

function LogininForm(props) {
    //writeUserData("Henry", "email", "rain", "ewww")
    const dataRef = useRef()
    const dataRef2 = useRef()

    const submithandler = (e) => {
        e.preventDefault()
        handleSubmit(dataRef.current.value, dataRef2.current.value)
        dataRef.current.value = ""
        dataRef2.current.value = ""
    }


    function loginHandler() {
        console.log("clicked");
    }
    return (
        <div>
            <form onSubmit={submithandler}>
                <div className='card'>
                    <div>
                        <h2>{props.text}</h2>
                        <label>
                            User Name:
                            <input type="text" name="username" ref={dataRef} />
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            Password :
                            <input type="text" name="password" ref={dataRef2} />
                        </label>
                    </div>
                    <br />
                    <div className='actions'>
                        <div className='rowC'>
                            <input className='btn' onClick={submithandler} type="submit" value="Create an Account" />
                            <input className='btn' onClick={loginHandler} type="submit" value="Log In" />
                        </div>
                    </div>
                </div>

            </form >

        </div>
    )
}

export default LogininForm;