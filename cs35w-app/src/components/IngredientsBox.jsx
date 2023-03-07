import React, { useState } from "react";

function IngredientsBox(props) {
    
    return (
        <div>
        <form>
            <label for="ingredient">Ingredient {props.id}:&nbsp;
            </label>
            <input type="text" id="ingredient" name="ingredient" size="20">
            </input>
        </form>
        </div>
    );
}

export default IngredientsBox;