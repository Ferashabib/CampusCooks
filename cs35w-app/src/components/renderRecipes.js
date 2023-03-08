

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
                alert('This recipe is added to your favorite successfully! :D');
            }
            else {
                alert("You must sign in before favoriting this recipe!");
                window.location.assign("/log_in");
            }
        });
    };


    const steps = [];

    async function UpvoteHandler(id) {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {

                const ref = doc(db, "Upload", id);

                await updateDoc(ref, {
                    upvotes: increment(1)
                });
                console.log(ref)
                window.location.reload(false);

            }
            else {
                alert("You must sign in before upvoting this recipe!");
                window.location.assign("/log_in");
            }
        });


    }
    for (let i = 0; i < props.recipeIds.length; i++) {

        steps.push(<div className="card">
            <GetData collection="Upload" document={props.recipeIds[i]} field="Title" />
            <br></br>
            Recipe:
            <GetData collection="Upload" document={props.recipeIds[i]} field="Recipe" />
            <br></br>
            By User:
            <GetData collection="Upload" document={props.recipeIds[i]} field="UserName" />
            <br></br>
            <div>
                <button className="btn btn--alt" onClick={() => {
                    favHandler(props.recipeIds[i]);
                }}>Favorite</button>
                <button className="btn" onClick={() => {
                    UpvoteHandler(props.recipeIds[i]);
                }}>Upvote
                <GetData collection="Upload" document={props.recipeIds[i]} field="upvotes" />
                </button></div></div>)
        steps.push(<br></br>)
    }

    let trisect = steps.length / 3 + (steps.length % 3);
    const left = steps.slice(0, trisect);
    const middle = steps.slice(trisect, trisect*2);
    const right = steps.slice(trisect*2, steps.length);

    return (
    <div class="row">
        <div class="column">
            {left}
        </div>
        <div class="column">
            {middle}
        </div>
        <div class="column">
            {right}
        </div>
    </div>
    );

}


export default RenderRecipes;

