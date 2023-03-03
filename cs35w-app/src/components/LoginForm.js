import handleSubmit from '../handles/handlesubmit';
import { useRef } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';



function LogininForm(props) {
    const dataRef = useRef()
    const dataRef2 = useRef()

    const submithandler = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, dataRef.current, dataRef2.current)
            .then((userCredential) => {
                console.log(userCredential)
                document.getElementById("signinForm").reset();
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email already in use!')
                        break;
                    case 'auth/weak-password':
                        alert('Password should be at least 6 characters!')
                        break;
                    case 'auth/invalid-email':
                        alert('Invalid email!')
                        break;
                    default:
                        alert(error.code);
                }
                console.log(error);
                document.getElementById("signinForm").reset();
            });
    }


    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, dataRef.current, dataRef2.current)
            .then((userCredential) => {
                console.log(userCredential)
                document.getElementById("signinForm").reset();
                window.location = "/";
            })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        alert('Incorrect password')
                        break;
                    case 'auth/user-not-found':
                        alert('Email not found')
                        break;
                    default:
                        alert(error.code);
                }
                console.log(error.code);
                document.getElementById("signinForm").reset();
            });
    }

    return (
        <div>
            <form id="signinForm">
                <div className='card'>
                    <div>
                        <h2>{props.text}</h2>
                        <label>
                            Email :
                            <input type="text" name="username" ref={dataRef}
                                onChange={(e) => dataRef.current = (e.target.value)} />
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            Password :
                            <input type="text" name="password" ref={dataRef2}
                                onChange={(e) => dataRef2.current = (e.target.value)} />
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