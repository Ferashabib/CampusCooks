

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




function RenderFavs(props) {


    const unfavHandler = (id) => {
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
                        favorite_recipe: arrayRemove(id)

                    });
                    window.location.reload(false);
                    //userRef.child("favorite_recipes").push(id)
                } catch (err) {
                    console.log(err)
                }
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

        steps.push(<div className="card" key={'recipe:' + i}>
            <div><GetData collection="Upload" document={props.recipeIds[i]} field="Recipe" /></div>
            <div><h5>Recipe provided by<GetData collection="Upload" document={props.recipeIds[i]} field="UserName" /></h5></div>
            <div><h5>This recipes has been made <GetData collection="Upload" document={props.recipeIds[i]} field="upvotes" /></h5></div>
            <div>
                <button className="btn btn--alt" onClick={() => {
                    unfavHandler(props.recipeIds[i]);
                }}>Unfavorite</button>
                <button className="btn" onClick={() => {
                    UpvoteHandler(props.recipeIds[i]);
                }}>I Made This Today</button></div></div>)

    }

    return (<div>{steps}</div>);

}





export default RenderFavs;

