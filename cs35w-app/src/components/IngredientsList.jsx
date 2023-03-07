import React, { useState } from "react";
import { db } from "../firebase";
import IngredientsBox from "./IngredientsBox";

function IngredientsList(props) {

    return (
        <div>
            <label>Ingredients:</label>
            {props.ingredients.map(ingredient => (
                <IngredientsBox key={ingredient.id} value={ingredient.value} 
                id={ingredient.id} />
            ))}
            <br></br>
            <button onClick={props.onAdd}>Add
            </button>
            <button onClick={props.onRemove}>Remove
            </button>
            <br></br><br></br>
        </div>
    );
}

export default IngredientsList;