import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateCollection from "./CreateCollection/CreateCollection";
import CreateNFT from "./CreateNFT/CreateNFT";
import CategoriesSelector from "./CategoriesSelector/CategoriesSelector";

import darkStyles from "./stylesheets/DarkCreate.module.css";
import lightStyles from "./stylesheets/LightCreate.module.css";
import useStyles from "../../customHooks/useStyles";
import { useLoggedUser } from "../../customHooks/useLoggedUser";

export default function Create() {
  const [loggedUser, updateLoggedUser, handleLogOut] = useLoggedUser()
  const user = loggedUser;

  const styles = useStyles(darkStyles, lightStyles);

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({
    name: "Name is required",
    price: "Price is required",
  });

  const [createdCollection, setCreatedCollection] = useState({
    userId: user.id,
    name: undefined,
    image: undefined,
  });
  console.log(createdCollection)
  const [createdNft, setCreatedNft] = useState({
    userId: user.id,
    collectionId: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    price: 0,
    categories: ["", "", "", "", "", "", ""],
  });

  // -- STEP --
  const next = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const back = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  // SUBMIT NFT
  const handleSubmit = (e) => {
    e.preventDefault();
    let createdNftObj = {
      ...createdNft,
      price: Number(createdNft.price),
      userId: user.id,
    };
    dispatch(actions.createNft(createdNftObj));
  };

  return (
    <div className={styles["create-container"]}>
      <fieldset
        className={
          step !== 1
            ? styles["display-none"]
            : styles["first-field-collections"]
        }
      >
        <CreateCollection
          createdNft={createdNft}
          image_prop={"image"}
          setCreatedNft={setCreatedNft}
          createdCollection={createdCollection}
          setCreatedCollection={setCreatedCollection}
          back={back}
          next={next}
        />
      </fieldset>

      <fieldset
        className={
          step !== 2
            ? styles["display-none"]
            : styles["second-field-collections"]
        }
      >
        <CreateNFT
          createdNft={createdNft}
          setCreatedNft={setCreatedNft}
          back={back}
          next={next}
          errors={errors}
          setErrors={setErrors}
        />
      </fieldset>

      <fieldset
        className={
          step !== 3 ? styles["display-none"] : styles["third-field-create"]
        }
      >
        <CategoriesSelector
          createdNft={createdNft}
          setCreatedNft={setCreatedNft}
        />

        <div className={styles["buttons-next-prev-container"]}>
          <button className={styles["disabled"]} onClick={back}>
            Back
          </button>
          <button
            className={
              createdNft.categories.includes("")
                ? styles["disabled"]
                : styles["button-create"]
            }
            type="submit"
            disabled={createdNft.categories.includes("")}
            onClick={(e) => handleSubmit(e)}
          >
            Create NFT
          </button>
        </div>
      </fieldset>
    </div>
  );
}
