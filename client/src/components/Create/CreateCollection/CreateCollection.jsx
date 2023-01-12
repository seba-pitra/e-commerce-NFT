import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions";
import CloudinaryImageInput2 from "../CloudinaryImageInput/CloudinaryImageInput2";

import lightStyles from "./stylesheets/LightCreateCollection.module.css";
import darkStyles from "./stylesheets/DarkCreateCollection.module.css";
import useStyles from "../../../customHooks/useStyles";
import UserCollectionsSelector from "./UserCollectionsSelector/UserCollectionsSelector";
import { useLoggedUser } from "../../../customHooks/useLoggedUser";

export default function CreateCollection({
  createdCollection,
  setCreatedCollection,
  setCreatedNft,
  createdNft,
  next,
}) {

  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const styles = useStyles(darkStyles, lightStyles);
  const user = loggedUser;
  const dispatch = useDispatch();

  const selectCollection = (e) => {
    e.preventDefault();
    setCreatedNft((prev) => ({
      ...prev,
      collectionId: e.target.value,
    }));
  };

  console.log(createdNft)

  const inputCollectionName = (e) => {
    e.preventDefault();
    setCreatedCollection((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const submitCreatedCollection = (e) => {
    e.preventDefault();
    setCreatedCollection((prev) => ({
      ...prev,
      userId: user.id,
    }));
    dispatch(actions.createCollection(createdCollection));
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
            <UserCollectionsSelector
              user={user}
              styles={styles}
              selectCollection={selectCollection}
              createdNft={createdNft}
              />
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
              <CloudinaryImageInput2 setImage={setCreatedCollection} image_prop={'image'}/>
            </div>
            <button
              className={
                createdCollection.name?.length > 3
                  ? styles["button-create"]
                  : styles["disabled"]
              }
              // si esto no se necesita mas borrenlo
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
            createdNft.collectionId
              ? styles["button-create"]
              : styles["disabled"]
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
