import { db } from "../firebase"
import React from "react";
import { collection, getDocs } from "firebase/firestore";




function GetIngredients(props) {
    let [data, setData] = React.useState([]);
    let list = []
    console.log(props.document)
    React.useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "Upload", props.document, "Ingredients"));

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc);
                data = (doc)
                //data += list;
                list.push(data);
                //console.log("11", list)
                //console.log(typeof (list))
                setData(list)



            });

        };
        fetchData();

    }, []);

    return data;


}
export default GetIngredients;

