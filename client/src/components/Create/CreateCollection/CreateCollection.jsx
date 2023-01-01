import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions";
import CloudinaryImageInput from "../CloudinaryImageInput/CloudinaryImageInput";

export default function CreateCollection({
        createdCollection,
        setCreatedCollection,
        setCreatedNft,
        createdNft,
        next
        })
    {
    const user = useSelector((state) => state.loggedUser);
    console.log(user);
    const dispatch = useDispatch();
    let render = false;
    console.log(user)

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

    return (
        <>
            <div className="inputContainer">
                <div className="divs-separet">
                    <h3>Collection</h3>
                    <h5>This is the collection where your item will appear.</h5>
                </div>

                <div className="divs-separet">
                    <h6>Choose the collection in which your nft will be created.</h6>
                            <h6 hidden disabled selected>
                                Select Collection
                            </h6>
                            {user.collections?.map((collection) => (
                                <>
                                <label htmlFor={collection.id}>{collection.name}</label>
                                <input
                                type="checkbox"
                                key={collection.id}
                                value={collection.id}
                                onClick={(e) => {selectCollection(e)}}
                                className="option-btn btn-filter"
                                />
                              </>
                            ))}
                </div>

                <div className="divs-separet">
                    <h6>Or create a new collection.</h6>
                        <input
                            type="text"
                            name="collection"
                            value={createdCollection.name}
                            onChange={(e) => inputCollectionName(e)}
                            />
                        <div className="inputContainer">
                            <CloudinaryImageInput
                                setImage={setCreatedCollection}
                            />
                        </div>
                    <button onClick={(e) => submitCreatedCollection(e)}>Create</button>
                </div>

            </div>
            <div className="buttons-next-prev">
                <button
                    className="button-next"
                    onClick={next}
                    disabled={createdNft.collectionId === null}
                >
                next
                </button>
            </div>
        </>
    );
}