import { db } from "../firebase"
import { addDoc, collection } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import IngredientsList from "./IngredientsList";
import React, { useState } from "react";

const auth = getAuth();


function UploadRecipes() {

    const [ingredients, setIngredients] = useState(
        [ {id: 1},
          {id: 2},
        ]
    )
    const handleAdd = (e) => {
        e.preventDefault();
        const currentsize = ingredients.length;
        const newIngredient = [ { id: currentsize+1} ];
        setIngredients(
            ingredients.concat(newIngredient)
        );
        
    };
    const handleRemove = (e) => {
        e.preventDefault();
        const newIngredients = ingredients.slice(0, ingredients.length-1)
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
                    UserName: user.email
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
                document.getElementById("uploadForm").reset();
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
                    <input id='title' type='text' size="55"/> <br />
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
                <input className='btn' onClick={handleSubmit} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default UploadRecipes
