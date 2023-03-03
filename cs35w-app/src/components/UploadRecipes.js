import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();


function UploadRecipes() {

    function handleSubmit(e) {
        e.preventDefault();
        const ref = collection(db, "Upload");
        onAuthStateChanged(auth, (user) => 
        {
            if (user) {
                let recipe = {
                    Recipe: document.getElementById('Recipe').value,
                    UserName: user.email
                }
                try {
                    addDoc(ref, recipe)
                } catch (err) {
                    console.log(err)
                }
                alert('Your recipe was submitted successfully! :D');
                document.getElementById("uploadForm").reset();
            } 
            else {
                alert("You must sign in before upload your recipe!");
                document.getElementById("uploadForm").reset();
            }
        });
    };

    return (
        <div>
            <h1> Upload your recipe by filling the form here! </h1>
            <h2> Note: You must log in before you can upload your recipe</h2>
            <form className='cardTextArea' id="uploadForm">
                <div>
                    <label>
                        Recipe: <br />
                    </label>
                    <textarea id='Recipe' type='text' rows="10" cols="45" placeholder='Write your recipe here!' />
                </div>
                <input className='btn' onClick={handleSubmit} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UploadRecipes
