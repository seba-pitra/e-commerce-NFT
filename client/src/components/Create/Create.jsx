import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../../utils";
import * as actions from "../../redux/actions";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import allCategories from "../../constants/categories.json"

import "./Create.css";
import "../NFTCard/NFTCard.css";
import CreateCollection from "./CreateCollection/CreateCollection";
import CreateNFT from "./CreateNFT/CreateNFT";
import CategoriesSelector from "./CategoriesSelector/CategoriesSelector";

export default function Create() {
//   const allCollections = useSelector((state) => state.collections);
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatusStorage = localStorage.getItem("Logged");
  const [createStep, setCreateStep] = useState(1);

  const [createdNft, setCreatedNft] = useState({
    userId: null,
    collectionId: "",
    collection: null,
    name: null,
    description: null,
    image: null,
    price: 0,
    categories: ["", "", "", "", "", "", ""],
    contract: null,
    ownerName: null,
    ownerIcon: null, 
  });

  const next = (e) => {
    e.preventDefault();
    setCreateStep(createStep + 1);
  };

  const back = (e) => {
    e.preventDefault();
    setCreateStep(createStep - 1);
  };

  const validateUser = async () => {
  if (loginStatusStorage === "Estoy loggeado") {
      dispatch(actions.getAllNfts());
      dispatch(actions.getAllCollections());
      dispatch(actions.getEthPrice());
    } else {
      history.push("/");
    }
  };
	
  useEffect(() => {
    validateUser();
  }, []);
  

  // CATEGORIES SELECTOR
  // una sola funcion con indice el cual indica la posicion del arreglo que tiene que editar
  let handleChangeSelect = (e, index) => {
    e.preventDefault();
    let auxCats = createdNft.categories;
    auxCats[index] = e.target.value;
    setCreatedNft((prev) => ({
      ...prev,
      categories: auxCats,
    }));
  };

  // CREATE NFT
  let handleSubmit = (e) => {
    e.preventDefault();
    let createdNftObj = {
      ...createdNft,
      price: Number(createdNft.price),
      ownerName: user.name + " " + user.last_name,
      ownerIcon: user.profile_pic, 
      userid: user.id,
    };
    dispatch(actions.createNft(createdNftObj));
  };

  // const restart = (e) => {
  //   e.preventDefault();
  //   setCreateStep(1);
  // };

  return (
    <>
        <div className="mainContainer">
          <fieldset
              className={`info-fieldset ${
                  createStep !== 1 ? "noneDisplay" : "first-field-collections"
              }`}
              >
                  <CreateCollection/>
          </fieldset>

          <fieldset className={`info-fieldset ${createStep !== 2 ? "noneDisplay" : ""}`}>
            <CreateNFT
              createdNft={createNft}
              setCreatedNft={setCreatedNft}
              back={back}
              next={next}
            />
          </fieldset>

          <fieldset className={`info-fieldset ${ createStep !== 3 ? "noneDisplay" : "first-field-collections"}`}>
            <CategoriesSelector/>
          </fieldset>
      </div>
    </>
  );
}
