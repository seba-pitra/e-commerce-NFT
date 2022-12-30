import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions";

export default function CreateCollection(props){
    const allCollections = useSelector((state) => state.collections);
    const user = useSelector((state) => state.loggedUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const [addCollection, setAddCollection] = useState({
        userId: null,
        name: null,
        image: "https://images.pexels.com/photos/12786598/pexels-photo-12786598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    });

    let selectCollection = (e) => {
        e.preventDefault();
        props.setCollection((prev) => ({
        ...prev,
        collection: e.target.value,
        }));
    };
    
    let inputCollections = (e) => {
        e.preventDefault();
        setAddCollection((prev) => ({
        ...prev,
        name: e.target.value,
        }));
    };
    
    let submitAddCollection = (e) => {
        e.preventDefault();
        dispatch(actions.createCollection(addCollection));
    };

    return (
        <>
            <div className="inputContainer">
                <div className="divs-separet">
                <h3>Collection</h3>
                <h5>This is the collection where your item will appear.</h5>
                </div>

                <div className="divs-separet">
                <h6>Create a new collection.</h6>
                <input
                    type="text"
                    name="collection"
                    value={addCollection.name}
                    onChange={(e) => inputCollections(e)}
                    />
                <button onClick={(e) => submitAddCollection(e)}>Create</button>
                </div>
                <div className="divs-separet">
                <h6>Choose the collection in which your nft will be created.</h6>
                <select onChange={(e) => selectCollection(e)} name="collections">
                    <option hidden disabled selected value>
                    {" "}
                    Select Collection{" "}
                    </option>
                    {allCollections?.map((collection) => (
                        <option value={collection.id} name="collections" key={collection.id}>
                        {collection.name} | {collection.nfts.length} items
                    </option>
                    ))}
                </select>
                </div>
            </div>
            <div className="buttons-next-prev">
                <button
                className="button-next"
                onClick={next}
                disabled={createdNft.collection === ""}
                >
                next
                </button>
            </div>
        </>
    );
}