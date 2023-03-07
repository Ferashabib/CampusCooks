import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
const auth = getAuth();


function UploadRecipes() {
    const [catergory, setCatergory] = useState("Salad")

    const onOptionChange = e => {
        setCatergory(e.target.value)
    }


    function handleSubmit(e) {
        e.preventDefault();
        const ref = collection(db, "Upload");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let recipe = {
                    Recipe: document.getElementById('Recipe').value,
                    UserName: user.email,
                    UserId: user.uid,
                    upvotes: 0,
                    Catergory: catergory
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
                window.location.assign('log_in');
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
                <div className="card">
                    <h3>Select A Catergory</h3>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="meat"
                        id="meat"
                        checked={catergory === "Meat"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="meat">Meat</label>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="seafood"
                        id="seafood"
                        checked={catergory === "seafood"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="seafood">Seafood</label>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="vegan"
                        id="vegan"
                        checked={catergory === "vegan"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="vegan">Vegan</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="pasta"
                        id="pasta"
                        checked={catergory === "pasta"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="pasta">Pasta</label>
                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="salad"
                        id="salad"
                        checked={catergory === "salad"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="salad">Salad</label>
                    {/* <input
                        type="radio"
                        name="recipe_catergory"
                        value="dessert "
                        id="dessert "
                        checked={catergory === "dessert"}
                        onChange={onOptionChange}
                    />
                    <label htmlFor="dessert ">dessert</label> */}

                    <p>
                        Catergory: <strong>{catergory}</strong>
                    </p>
                </div>
                <input className='btn' onClick={handleSubmit} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UploadRecipes
