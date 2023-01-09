import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../redux/actions";
import CloudinaryImageInput2 from "../CloudinaryImageInput/CloudinaryImageInput2";
import styles from "../stylesheets/CreateCollection.module.css";

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

  return (
    <>
      <div className={styles["create-collection-container"]}>
        {/* <div className={styles["divs-separet"]}> */}
        <div className={styles["create-collection-titles-container"]}>
          <h1>Create your Collection</h1>
          <h4>This is the collection where your NFT will appear.</h4>
        </div>

        <div className={styles["choose-collections-created"]}>
          <h4>Choose the collection in which your nft will be created</h4>
          <div className={styles["div-created-collections"]}>
            {user.collections?.map((collection) => (
<<<<<<< HEAD
              <div
              key={collection.id}
              className="created-collections">
                <label htmlFor={collection.id}>
                  <b>{collection.name}</b>
=======
              <div className={styles["created-collections"]}>
                <label htmlFor={collection.id}>
                  <b>{collection.name}</b>{" "}
>>>>>>> origin/development
                </label>
                <input
                  type="checkbox"
                  value={collection.id}
                  onClick={(e) => {
                    selectCollection(e);
                  }}
                  className={styles["option-btn btn-filter"]}
                  // className="option-btn btn-filter" SE VA A ROMPER CUANDO FUNCIONE EL CREATE. ES DE OTRO ARCHIVO
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles["create-collection"]}>
          <h4>Or create a new collection.</h4>
          <div className={styles["div-create-collection"]}>
            <div className={styles["input-name-container"]}>
              <h5 htmlFor="collection">Type a name</h5>
              <input
                type="text"
                name="collection"
                value={createdCollection.name}
                onChange={(e) => inputCollectionName(e)}
                className={styles["create-collection-input"]}
              />
            </div>
            <div className={styles["cloudinary-collections-create"]}>
              <h5>Add image</h5>
              <CloudinaryImageInput2 setImage={setCreatedCollection} />
            </div>
            <button
              className={
                createdCollection.name?.length > 3
                  ? styles["button-create"]
                  : styles["disabled"]
              }
              // className={
              //   createdCollection.name?.length > 3
              //     ? "button-create"
              //     : "disabled"
              // }
              onClick={(e) => submitCreatedCollection(e)}
              disabled={createdCollection.name?.length <= 3}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="buttons-next-prev-container">
        <button
          className={
            createdNft.collectionId ? styles["button-next"] : styles["disabled"]
          }
          onClick={next}
          disabled={createdNft.collectionId === undefined}
        >
          Create NFT
        </button>
      </div>
    </>
  );
}
