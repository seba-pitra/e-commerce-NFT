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
  next,
}) {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  let render = false;

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
    render = true;
  };

  console.log(createdNft);

  return (
    <>
      <div className="inputContainer">
        <div className="divs-separet">
          <h1>Create your Collection</h1>
          <h4>This is the collection where your NFT will appear.</h4>
        </div>

        <div className="choose-collections-created">
          <h4>Choose the collection in which your nft will be created</h4>
          <div className="div-created-collections">
            {user.collections?.map((collection) => (
              <div className="created-collections">
                <label htmlFor={collection.id}>
                  {" "}
                  <b>{collection.name}</b>{" "}
                </label>
                <input
                  type="checkbox"
                  key={collection.id}
                  value={collection.id}
                  onClick={(e) => {
                    selectCollection(e);
                  }}
                  className="option-btn btn-filter"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="create-collection">
          <h4>Or create a new collection.</h4>
          <div className="div-create-collection">
            <div className="input-name-container">
              <label htmlFor="collection">Type a name</label>
              <input
                type="text"
                name="collection"
                value={createdCollection.name}
                onChange={(e) => inputCollectionName(e)}
                className="create-collection-input"
              />
            </div>
            <div className="cloudinary-collections-create">
              <span>Add image</span>
              <CloudinaryImageInput2 setImage={setCreatedCollection} />
            </div>
            <button
              className={
                createdCollection.name?.length > 3
                  ? "button-create"
                  : "disabled"
              }
              onClick={(e) => submitCreatedCollection(e)}
              disabled={createdCollection.name?.length <= 3}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="buttons-next-prev">
        <button
          className={createdNft.collectionId ? "button-next" : "disabled"}
          onClick={next}
          disabled={createdNft.collectionId === undefined}
        >
          Create NFT
        </button>
      </div>
    </>
  );
}
