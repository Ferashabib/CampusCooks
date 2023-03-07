import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { ReactDOM } from "react";
import { useEffect, useState } from "react";
import React from "react";
import { collection, getDocs } from "firebase/firestore";



function GetData(props) {
    let [data, setData] = React.useState("");
    const docRef = doc(db, props.collection, props.document);
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await getDoc(docRef);
            //console.log(response.data());
            data = response.get(props.field);
            //console.log(data);
            setData(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            {data}
        </div>
    );
}





export default GetData;

