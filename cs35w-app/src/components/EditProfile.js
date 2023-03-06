import { React, useState } from 'react';
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";
import { storage } from "../firebase"
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';


const EditProfile = () => { 
    const auth = getAuth();
    const [User, setUser] = useState(null);
    let filename = '';
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } 
      else {
        alert("you are not log in");
        window.location.assign("/log_in");
      }
    });


    const uploadHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        if(file == null) return;
        filename = file.name;
        const photoRef = ref(storage, "/UserImg/" + User.email + "/" + filename);
        uploadBytes(photoRef, file).then(() => {
            alert("Image Uploaded");
        });
    };

    const saveHandler = async () => {
        const name = document.getElementById("fname").value;
        console.log(filename);
        if(filename != '')
        {
            const photoRef = ref(storage, "/UserImg/" + User.email + "/" + filename);
            const UserPhotoURL = await getDownloadURL(photoRef);
            updateProfile(User, {
                photoURL: UserPhotoURL 
            });
        }
        if(name != '')
        {
            updateProfile(User, {
                displayName: name
            });
        }
        document.getElementById("bioform").reset();
        document.getElementById("photoform").reset();
    };

    return (
        <div>
            <h1> Welcome to edit page. You can edit your information here.</h1>
            <form className='cardTextArea' id='bioform'>
                <div>
                    <label> Username: </label>
                    <input type="text" id="fname" name="fname"></input><br/>
                </div>
                <br/>
            </form>
            <form onSubmit={uploadHandler} className='cardTextArea' id='photoform'>
                <label> Photo: </label>
                <input type="file" />
                <button type="submit"> Upload Image</button>
            </form>
            <button className='btn' onClick={saveHandler}>Save</button>
            
        </div>
    )
}

export default EditProfile