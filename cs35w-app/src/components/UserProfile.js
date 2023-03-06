import { React, useState } from 'react';
import { updateProfile, getAuth, onAuthStateChanged } from "firebase/auth";

const edit = () => {
  window.location.assign('/edit')
}

const Profile = () => {
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



  if(User)
  {
    //Sets up default user name and photo since they were null after the user created their account
    if(User.displayName == null && User.photoURL == null)
    {  
      updateProfile(User, {
        displayName: "Guest", photoURL: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png"
      });
    }

    return(
      <div>
        <h1> My profile</h1>
        <img id ="photoHolder" src={User.photoURL} alt="Profile picture" width="100"></img>
        <h1>Name: {User.displayName}</h1> 
        <h1>Email: {User.email}</h1>
        <button onClick={edit}>Edit Profile</button>
      </div>
    )
  };

}


function UserProfile() {
    return (
      <Profile/>
    );
};

export default UserProfile;