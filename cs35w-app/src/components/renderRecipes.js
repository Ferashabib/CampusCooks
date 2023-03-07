import { db } from "../firebase"
import React from "react";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import GetData from "../data/getdata";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function RenderRecipes(props) {


    const favHandler = (id) => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                try {
                    await updateDoc(userRef, {
                        favorite_recipe: arrayUnion(id)
                    });
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

    async function MadeThisHandler(id) {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const ref = doc(db, "Upload", id);
                await updateDoc(ref, {
                    upvotes: increment(1)
                });
                window.location.reload(false);
            }
            else {
                alert("You must sign in before adding to 'Made It'!");
                window.location.assign("/log_in");
            }
        });
    }
    for (let i = 0; i < props.recipeIds.length; i++) {

        steps.push(<div className="card" key={'recipe:' + i}><div><GetData collection="Upload" document={props.recipeIds[i]} field="Recipe" /></div>
            <div> <h5>Catergory: <GetData collection="Upload" document={props.recipeIds[i]} field="Catergory" /> </h5></div>
            <div> <h5>Recipe provided by <GetData collection="Upload" document={props.recipeIds[i]} field="UserName" /> </h5></div>
            <div> <h5>This recipes has been made <GetData collection="Upload" document={props.recipeIds[i]} field="upvotes" /> time(s)</h5></div>


            <div>
                <button className="btn btn--alt" onClick={() => {
                    favHandler(props.recipeIds[i]);
                }}>Favorite</button>
                <button className="btn" onClick={() => {
                    MadeThisHandler(props.recipeIds[i]);
                }}>I Made This Today</button></div></div>)

    }

    return (<div>{steps}</div>);

}





export default RenderRecipes;

