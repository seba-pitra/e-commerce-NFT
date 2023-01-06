import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions";
import CloudinaryImageInput2 from "../CloudinaryImageInput/CloudinaryImageInput2";

export default function CreateCollection({
        createdCollection,
        setCreatedCollection,
        setCreatedNft,
        createdNft,
        next
        })
    {
    const user = useSelector((state) => state.loggedUser);
    const dispatch = useDispatch();
    let render = false;
    // console.log(user)

    const selectCollection = (e) => {
        e.preventDefault();
        setCreatedNft((prev) => ({
        ...prev,
        collectionId: e.target.value,
        }));
    };
    
    const inputCollectionName = (e) => {
        e.preventDefault();
        setCreatedCollection((prev) => ({
        ...prev,
        name: e.target.value,
        }));
    };
    
    const submitCreatedCollection = (e) => {
        e.preventDefault();
        dispatch(actions.createCollection(createdCollection));
        render = true
    };

    useEffect(()=> {
        setCreatedCollection((prev) => ({
            ...prev,
            userId: user.id,
        }));
        render = false
    }, [user, render])

    console.log(createdNft)

    return (
        <>
            <div className="inputContainer">
                <div className="divs-separet">
                    <h3>Collection</h3>
                    <h5>This is the collection where your item will appear.</h5>
                </div>

                <div className="divs-separet">
                    <h6>Choose the collection in which your nft will be created.</h6>
                    <div className="div-created-collections">
                        {user.collections?.map((collection) => (
                            <div className="created-collections">
                                <label htmlFor={collection.id}> <b>{collection.name}</b> </label>
                                <input
                                type="checkbox"
                                key={collection.id}
                                value={collection.id}
                                onClick={(e) => {selectCollection(e)}}
                                className="option-btn btn-filter"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="divs-separet">
                    <h6>Or create a new collection.</h6>
                    <div className="div-create-collection">
                        <input
                            type="text"
                            name="collection"
                            value={createdCollection.name}
                            onChange={(e) => inputCollectionName(e)}
                            />
                        <div className="cloudinary-collections-create">
                        <span>Add Collection Image</span>
                            <CloudinaryImageInput2
                                setImage={setCreatedCollection}
                            />
                        </div>
                    <button 
                        className={ createdCollection.name?.length > 3 ? "button-create" : "disabled" } 
                        onClick={(e) => submitCreatedCollection(e)}
                        disabled={createdCollection.name?.length <= 3}
                        >Create</button>
                    </div>
                </div>

            </div>
            <div className="buttons-next-prev">
                <button
                    className={createdNft.collectionId ? "button-next" : "disabled"}
                    onClick={next}
                    disabled={createdNft.collectionId === undefined}
                >
                Next
                </button>
            </div>
        </>
    );
}