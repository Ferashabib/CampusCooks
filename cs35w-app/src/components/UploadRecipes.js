import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"

function UploadRecipes() {

    function handleSubmit(e) {
        e.preventDefault();
        const ref = collection(db, "Upload");
        let recipe = {
            Recipe: document.getElementById('Recipe').value
        }
        try {
            addDoc(ref, recipe)
        } catch (err) {
            console.log(err)
        }
        alert('Your recipe was submitted successfully! :D');
        document.getElementById("uploadForm").reset();
    };

    return (
    <div>
        <h1> Upload your recipe by filling the form here! </h1>
        <form className='cardTextArea' id="uploadForm">
        <div>
            <label>
              Recipe: <br/>
            </label>
            <textarea id='Recipe' type='text' rows="10" cols="45" placeholder='Write your recipe here!'/>
        </div>
        <input className='btn' onClick={handleSubmit} type="submit" value="Submit" />
        </form>
    </div>
    );
}

export default UploadRecipes
