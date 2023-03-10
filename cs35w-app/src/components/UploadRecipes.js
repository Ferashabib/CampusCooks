import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import IngredientsList from "./IngredientsList";
import React, { useState } from "react";

const auth = getAuth();


function UploadRecipes() {
    const [catergory, setCatergory] = useState("Salad")

    const onOptionChange = e => {
        setCatergory(e.target.value)
    }


    const [ingredients, setIngredients] = useState(
        [{ id: 1 },
        { id: 2 },
        ]
    )
    const handleAdd = (e) => {
        e.preventDefault();
        const currentsize = ingredients.length;
        const newIngredient = [{ id: currentsize + 1 }];
        setIngredients(
            ingredients.concat(newIngredient)
        );

    };
    const handleRemove = (e) => {
        e.preventDefault();
        const newIngredients = ingredients.slice(0, ingredients.length - 1)
        setIngredients(
            newIngredients
        );
    };

    function handleSubmit(e) {
        e.preventDefault();
        const ref = collection(db, "Upload");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let listOfIngredients = [];

                for (let i = 1; i <= ingredients.length; i++) {
                    listOfIngredients.push(document.getElementById(("ingredient" + i)).value);
                }
                listOfIngredients = listOfIngredients.filter(element => element !== "");
                listOfIngredients = listOfIngredients.map(word => word.toLowerCase());

                let recipe = {
                    Title: document.getElementById('title').value,
                    Ingredients: listOfIngredients,
                    Recipe: document.getElementById('Recipe').value,
                    UserName: user.email,
                    UserId: user.uid,
                    upvotes: 0,
                    Catergory: catergory,
                    Comments: []
                }
                try {
                    addDoc(ref, recipe)
                } catch (err) {
                    console.log(err)
                }
                console.log(recipe);
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
            <h1> Upload your recipe! </h1>
            <label> Note: You must log in before you can upload your recipe.</label>

            <form className='cardTextArea' id="uploadForm">
                <div>
                    <label>
                        Title: <br />
                    </label>
                    <input id='title' type='text' size="55" /> <br />
                    <label>
                        Recipe: <br />
                    </label>
                    <textarea id='Recipe' type='text' rows="10" cols="45" placeholder='Write your recipe here!' />
                </div>

                <IngredientsList
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    ingredients={ingredients}
                />

                <div className="card">
                    <h3>Select A Catergory</h3>

                    <input
                        type="radio"
                        name="recipe_catergory"
                        value="meat"
                        id="meat"
                        checked={catergory === "meat"}
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
