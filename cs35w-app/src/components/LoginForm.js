import handleSubmit from '../handles/handlesubmit';
import { useRef } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {Alert} from 'react-native';

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
        e.preventDefault();
        createUserWithEmailAndPassword(auth, dataRef.current, dataRef2.current)
            .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            // switch(error.code) {
            //     case 'auth/email-already-in-use':
            //           Alert.alert('Email already in use !')
            //           break;
            //  }
            console.log(error);
        });
        //handleSubmit(dataRef.current.value, dataRef2.current.value)
        //this.dataRef.value = ""
        //dataRef2.current.value = ""
    }


    const loginHandler = (e) => {
        //console.log("clicked");
        e.preventDefault();
        signInWithEmailAndPassword(auth, dataRef.current, dataRef2.current)
            .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error);
        });

        //handleSubmit(dataRef.current.value, dataRef2.current.value)
        //this.dataRef.current = ""

        //dataRef2.current.value = ""
    }
    return (
        <div>
            <form onSubmit={submithandler}>
                <div className='card'>
                    <div>
                        <h2>{props.text}</h2>
                        <label>
                            User Name:
                            <input type="text" name="username" ref={dataRef} 
                            onChange={(e) => dataRef.current = (e.target.value)}/>
                        </label>
                    </div>

                    <br />
                    <div>
                        <label>
                            Password :
                            <input type="text" name="password" ref={dataRef2} 
                            onChange={(e) => dataRef2.current = (e.target.value)}/>
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