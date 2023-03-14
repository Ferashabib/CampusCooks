import React, { useState, useRef } from 'react';
import RenderRecipes from '../components/renderRecipes';
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import IngredientsList from './IngredientsList';

function SearchRecipe (props) {
    const [ids, setIds] = useState([]);
    const [current_selection, setSelection] = useState("Recipe Name");
    const [ingredients, setIngredients] = useState(
        [ {id: 1},
          {id: 2},
        ]
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        GetSearch()
            .then(function(list) {
                setIds(list);
            })
            .catch(function(list) {
                console.log("something went wrong");
                return;
            })    
    }

    const GetSearch = async () => {
        let search = "";
        if (document.getElementById("searchBar").value) {
            search = (document.getElementById("searchBar").value).toLowerCase();
        }
        console.log(search);

        let list = [];
        const querySnapshot = await getDocs(collection(db, "Upload"));
        querySnapshot.forEach((doc) => {

            if (current_selection == "Recipe Name") {
                let title = (doc.data().Title);
                if (title) {
                    title = title.toLowerCase();
                    if (title.includes(search)) {
                        list.push(doc.id);
                    }
                }
            }
            else if (current_selection == "User") {
                let user = (doc.data().UserName);
                if (user) {
                    user = user.toLowerCase();
                    if (user.includes(search)) {
                        list.push(doc.id);
                    }
                }
            }
            
        });
        return new Promise(function(resolve, reject) {
            resolve(list);
        }) 
    }

    const changeInput = (e) => {
        e.preventDefault();
        const current = document.getElementById("select").value;
        setSelection(current);
    }

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
    
    return (
        <div>
            <div>
                <label for="select">Search by:&nbsp;</label>
                <select id="select" onChange={changeInput}>
                    <option value="Recipe Name">Recipe Name</option>
                    <option value="Ingredients">Ingredients</option>
                    <option value="Price">Price</option>
                    <option value="User">User</option>
                </select>
            </div>
            <br></br>

            {((current_selection == "Recipe Name") || (current_selection == "User")) && <div>
                <input type="text" id="searchBar" size="40"></input>
                 <button onClick={handleSubmit}>Search</button>
            </div>}

            {
                (current_selection == "Ingredients") &&
                <div>
                    <IngredientsList onAdd={handleAdd} onRemove={handleRemove} ingredients={ingredients}/>
                    <button onClick={handleSubmit}>Search (NOT YET IMPLEMENTED)</button>
                </div>
            }

            <h2>({ids.length}) Results</h2>
            <div>
                {<RenderRecipes recipeIds={ids}/>}
            </div>
        </div>
    )
}

export default SearchRecipe;