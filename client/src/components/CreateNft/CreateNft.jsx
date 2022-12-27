import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateNft.css";
import "../NFTCard/NFTCard.css";
import PreviewNft from "./PreviewNft/PreviewNft";
import * as actions from "../../redux/actions";
import { useEffect, useRef } from "react";



export function validate(input) {
  let errors = {
    name: "no data",
    price: "no data",
  };

  if (!/([A-Z])/.test(input.name)) errors = { ...errors, name: "Username is invalid" };
  else errors = { ...errors, name: "Name is correct" };

  if (input.price <= 0) errors = { ...errors, price: "Price can not be 0 or less" };
  else errors = { ...errors, price: "Price is correct" };
  
  return errors;
}

export default function Form() {

  useEffect(() => {
    dispatch(actions.getAllCollections());
  }, []);

  const dispatch = useDispatch();

  const allCollections = useSelector((state) => state.collections);

  // cloudinary >>>
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log(cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dwyhztlkw",
        uploadPreset: "non_fungible_town",
      },
      function (error, result) {
        if (result.info.files) {
          let urlImg = result.info.files[0].uploadInfo.secure_url;
          console.log(result.info.files[0].uploadInfo.secure_url);
          setInput((prev) => ({ ...prev, image: urlImg }));
        }
      }
    );
  }, []);
  
  let handleUpload = (e) => {
    e.preventDefault();
    widgetRef.current.open();
  };
  // cloudinary <<<

  let [input, setInput] = React.useState({

    // 1er
    collection: "",

    // 2do
    name: "",
    description: "",
    image: "no image found",
    price: 0,

    // 3er
    categories: ["", "", "", "", "", "", ""],

    // autofill
    contract: "non-contract-yet",
    ownerName: "banx",
    ownerIcon: "",
  });

  const [errors, setErrors] = React.useState({
    name: "no data",
    price: "no data",
  });

  const [addCollection, setAddCollection] = React.useState("");

  //asi tendria q venir el array de categories,puede cambiar como venga
  const allCategories = {
    species: ["Animal", "Humanoid", "Other"],
    species2: ["Cat", "Other"],
    art: ["Artist", "Other"],
    type: ["2d", "Other"],
    style: ["Urban", "Other"],
    rest: ["Adult", "Normal"],
    flat: ["Flat", "Other"]
  }

  let handleChange = (e) => {
    e.preventDefault();
    setAddCollection(e.target.value);
  };

  let submitAddCollection = (e) => {
    e.preventDefault();
    dispatch(actions.createCollection(addCollection))
  }; 

  let handleChangeSelect = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[0] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }))
  };

  let handleChangeSelect1 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[1] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }));
  };

  let handleChangeSelect2 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[2] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }));
  };

  let handleChangeSelect3 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[3] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }));
  };

  let handleChangeSelect4 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[4] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }));
  };

  let handleChangeSelect5 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[5] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }));
  };

  let handleChangeSelect6 = (e) => {
    e.preventDefault();
    let auxCats = input.categories;
    auxCats[6] = e.target.value
    setInput((prev) => ({
      ...prev,
      categories: auxCats
    }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createNft(input))
  };

  // --- NEXT - PREV ---
  const [createStep, setCreateStep] = useState(1);

  const next = (e) => {
    e.preventDefault();
    setCreateStep(createStep + 1);
  };

  const back = (e) => {
    e.preventDefault();
    setCreateStep(createStep - 1);
  };

  // const restart = (e) => {
  //   e.preventDefault();
  //   setCreateStep(1);
  // };

  return (
    <React.Fragment>
      <div className="mainContainer">
    
        <fieldset className={`info-fieldset ${createStep !== 1 ? "noneDisplay" : ""}`} >
          <div className="inputContainer">
              <label>Collection</label>
              <p>This is the collection where your item will appear.</p>
              <input
                type="text"
                name="collection"
                value={addCollection}
                onChange={(e) => handleChange(e)}
              />
              <button onClick={(e) => submitAddCollection(e)}>add</button>
            </div>
          <button 
            onClick={next} 
            disabled={
              input.collection === ""
            } >Next
          </button>

          <select onChange={(e) => handleChangeSelect1(e)} name="categories">
              <option hidden disabled selected value> Select collection </option>
              {allCollections?.map((e) => ( <option value={e.name} name="categories" key={e.name}> {e.name} </option> ))}
            </select>


        </fieldset>

        <fieldset className={`info-fieldset ${createStep !== 2 ? "noneDisplay" : ""}`} >
          <div className="createNftContainer">
            <form className="createNft">
              <div className="inputContainer">
                <label>Name</label>
                <div className="inputAndErrorsMsg">
                  <input
                    type={"text"}
                    name={"name"}
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    placeholder={"NFTs name..."}
                  />
                  <p className={errors.name === 'Name is correct' ? 'greenMsg' : 'redMsg'}>{errors.name}</p>
                </div>
              </div>

              <div className="inputContainer">
                <h3>Image,video,audio or 3D model</h3>
                <button
                className="upload-file" 
                onClick={(e) => handleUpload(e)}>Upload</button>
                <p>
                  File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                  OGG, GLB, GLTF. Max size: 100 MB
                </p>
              </div>

              <div className="inputContainer">
                <label>Description</label>
                <input
                  type={"text"}
                  name={"description"}
                  value={input.description}
                  onChange={(e) => handleChange(e)}
                  placeholder={"this NFT its about..."}
                />
                <p>
                  The description will be included on the item's detail page below
                  its image.
                </p>
              </div>

              <div className="inputContainer">
                <label>Price</label>
                <p>Put the price only in Ethereum</p>
                <div className="inputAndErrorsMsg">
                  <input
                    type={"number"}
                    name={"price"}
                    value={input.price}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className={errors.price === 'Price is correct' ? 'greenMsg' : 'redMsg'}>{errors.price}</p>
                </div>
              </div>
            </form>
          </div>

          <div className="ilustration-validations">
            <div className="ilustrationContainer">
                <h2>This is how your NFT it will be create</h2>
                <PreviewNft
                  image={input.image}
                  name={input.name}
                  price={input.price}
                  tokenId={input.tokenId}
                />
              </div>
          </div>

          <button onClick={back}>Back</button>
          <button 
            onClick={next}
            disabled={
              errors.name !== "Name is correct" ||
              errors.price !== "Price is correct"
            }
          >Next</button>
        </fieldset>

        <fieldset className={`info-fieldset ${createStep !== 3 ? "noneDisplay" : ""}`} >
          <div className="inputContainer">
            <label>Category</label>
            <p>
              Add one category or more to classify it.You can select
              categories by existing ones or add a new one
            </p>
            <button className="addCategory"></button>

            <select onChange={(e) => handleChangeSelect(e)} name="categories">
              <option hidden disabled selected value> Specie </option>
              {allCategories.species.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>
            
            <select onChange={(e) => handleChangeSelect1(e)} name="categories">
              <option hidden disabled selected value> Specie2 </option>
              {allCategories.species2.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>

            <select onChange={(e) => handleChangeSelect2(e)} name="categories">
              <option hidden disabled selected value> Art </option>
              {allCategories.art.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>

            <select onChange={(e) => handleChangeSelect3(e)} name="categories">
              <option hidden disabled selected value> Type </option>
              {allCategories.type.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>
            
            <select onChange={(e) => handleChangeSelect4(e)} name="categories">
              <option hidden disabled selected value> Style </option>
              {allCategories.style.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>

            <select onChange={(e) => handleChangeSelect5(e)} name="categories">
              <option hidden disabled selected value> Rest </option>
              {allCategories.rest.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>

            <select onChange={(e) => handleChangeSelect6(e)} name="categories">
              <option hidden disabled selected value> Flat </option>
              {allCategories.flat.map((e) => ( <option value={e} name="categories" key={e}> {e} </option> ))}
            </select>

          </div>
            
          <div className="ilustration-validations">
            <input
              className={errors.name === 'Name is correct' && errors.price === 'Price is correct' ? 'submit' : 'errorSubmit'}
              type="submit"
              value={"Create NFT"}
              disabled={
                input.categories.includes("")
              }
              onClick={(e) => handleSubmit(e)}
            />
          </div>

          <button onClick={back}>Back</button>
        </fieldset>
        
      </div>

    </React.Fragment>
  );
}
