import React from 'react';
import { getAuth } from "firebase/auth";
import GetFavID from '../data/getFavId';
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import RenderRecipes from './renderRecipes';


const Favorite = () => {

    const Greeting = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            return user.uid;
        } else {
            return null;
        }
    }
    const getUserData = async (userid) => {
        const docRef = doc(db, "users", userid);
        const docSnap = await getDoc(docRef);
        console.log("b4")
        if (docSnap.exists()) {
            const ids = docSnap.data();
            console.log(ids.favorite_recipe)
            console.log("after")
            return ids.favorite_recipe
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };
    const userid = Greeting();
    let ids = getUserData(userid);
    console.log("####", ids)

    return (
        <div>
            User's favorite recipes will be displayed here
            {/* <div><h1><Greeting /></h1></div>
            <div id="outer"><h3> <RenderRecipes recipeIds={ids} /></h3></div> */}
        </div>

    );


};

export default Favorite;