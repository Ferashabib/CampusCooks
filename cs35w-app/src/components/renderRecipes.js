

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs } from "firebase/firestore";
import GetData from "../data/getdata";
import GetRecipeID from "../data/getRecipeId";



function RenderRecipes(props) {



    const steps = [];
    for (let i = 0; i < props.recipeIds.length; i++) {

        steps.push(<div className="card"><GetData collection="Upload" document={props.recipeIds[i]} field="Recipe" /></div>)
        steps.push(<div className="card"><GetData collection="Upload" document={props.recipeIds[i]} field="UserName" /></div>)

    }

    return (<div>{steps}</div>);

}





export default RenderRecipes;

