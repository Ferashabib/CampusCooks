import { React, useState } from 'react';
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";


const EditProfile = () => { 
    const auth = getAuth();
    const [User, setUser] = useState(null);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } 
      else {
        alert("you are not log in");
        window.location.assign("/log_in");
      }
    });

    
    const saveHandler = () => {
        const name = document.getElementById("fname").value;
        console.log(name);
        const photourl = document.getElementById("photo").value;
        console.log(name);
        if(name != '')
        {
            updateProfile(User, {
                displayName: name
            });
        }

        if(photourl != '')
        {
            updateProfile(User, {
                photoURL: photourl
            });
        }
    }

    return (
        <div>
            <h1> Welcome to edit page. You can edit your information here.</h1>
            <form className='cardTextArea' id="uploadForm">
                <div>
                    <label> Username: </label>
                    <input type="text" id="fname" name="fname"></input><br/>
                    <label> PhotoURL: </label>
                    <input type="photo" id="photo" name="photo"></input><br/>
                </div>
                <br/>
                <button className='btn' onClick={saveHandler}>Save</button>
            </form>
            
        </div>
    )
}

export default EditProfile