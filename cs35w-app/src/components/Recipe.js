import { useState } from "react";
import Modal from './Modal';
import Backdrop from './Backdrop';


function Recipe(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function imageHandler() {
        setModalIsOpen(true);
    }

    function closeModalHandler() {
        setModalIsOpen(false);
    }



    return (
        <div>
            <div>{modalIsOpen && <Modal onCancel={closeModalHandler} />} </div>
            <img src={require(`../images/${props.text}.jpg`)} alt={props.text} onClick={imageHandler} />

        </div >
    )
}

export default Recipe;
