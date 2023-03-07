

import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import GetData from "../data/getdata";
import GetRecipeID from "../data/getRecipeId";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';




function RenderRecipes(props) {


    const favHandler = (id) => {
        //e.preventDefault();
        const auth = getAuth();

        //const ref = collection(db, "Upload");
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                const userRef = doc(db, "users", user.uid);
                console.log(userRef)
                console.log(id)
                try {
                    await updateDoc(userRef, {
                        favorite_recipe: arrayUnion(id)
                    });
                    //userRef.child("favorite_recipes").push(id)
                } catch (err) {
                    console.log(err)
                }
                alert('Your recipe was submitted successfully! :D');
            }
            else {
                alert("You must sign in before upload your recipe!");
                window.location.assign("/log_in");
            }
        });
    };


    const steps = [];

    async function UpvoteHandler(id) {

        const ref = doc(db, "Upload", id);

        await updateDoc(ref, {
            upvotes: increment(1)
        });
        console.log(ref)
        window.location.reload(false);

    }
    for (let i = 0; i < props.recipeIds.length; i++) {

        steps.push(<div className="card"><GetData collection="Upload" document={props.recipeIds[i]} field="Recipe" />
            <GetData collection="Upload" document={props.recipeIds[i]} field="UserName" />
            <GetData collection="Upload" document={props.recipeIds[i]} field="upvotes" />
            <div>
                <button className="btn btn--alt" onClick={() => {
                    favHandler(props.recipeIds[i]);
                }}>favorite</button>
                <button className="btn" onClick={() => {
                    UpvoteHandler(props.recipeIds[i]);
                }}>Upvote</button></div></div>)

    }

    return (<div>{steps}</div>);

}





export default RenderRecipes;

