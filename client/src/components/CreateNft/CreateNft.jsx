import React from "react";
import "./CreateNft.css";
import "../NFTCard/NFTCard.css";
import PreviewNft from "./PreviewNft/PreviewNft";
import UploadWidget from "./UploadWidget";
import {useEffect,useRef} from 'react';
export function validate(input) {
  let errors = {
    name: "no data",
    price: "no data",
  };

  console.log(input);

  if (!/([A-Z])/.test(input.name)) {
    errors = { ...errors, name: "Username is invalid" };
  } else {
    errors = { ...errors, name: "Name is correct" };
  }
  if (input.price <= 0) {
    errors = { ...errors, price: "Price can not be 0 or less" };
  } else {
    errors = { ...errors, price: "Price is correct" };
  }
  console.log(errors);
  return errors;
}
export default function Form() {
  let [input, setInput] = React.useState({
    name: "NFT's name",
    description: "",
    collection: "",
    link: "",
    categories: [],
    price: 0,
    image: "no image found",
  });
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
        if(result.info.files){
          let urlImg =result.info.files[0].uploadInfo.secure_url
          console.log(result.info.files[0].uploadInfo.secure_url)
          setInput((prev) => ({ ...prev, image: urlImg }));
        }
       
        
      }
    );
  }, []);
  let handleUpload = (e) => {
    e.preventDefault();
    widgetRef.current.open();
    
  };
  
  let handleOpenWidget = (img) => {};
  const [errors, setErrors] = React.useState({
    name: "no data",
    price: "do data",
  });

  //asi tendria q venir el array de categories,puede cambiar como venga
  let categories = ["humanoid", "cyberpunk", "object", "animal"];

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  let handleChangeSelect = (e) => {
    if (!input.categories.includes(e.target.value)) {
      setInput((prev) => ({
        ...prev,
        categories: [...input.categories, e.target.value],
      }));
    }
    console.log(input);
  };

  return (
    <React.Fragment>
      <div className="mainContainer">
        <div className="createNftContainer">
          <h1>Create Non Fungible Token</h1>

          <form className="createNft">
            <div className="inputContainer">
              <label>Name</label>
              <input
                type={"text"}
                name={"name"}
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inputContainer">
              <h3>Image,video,audio or 3D model</h3>
              <button onClick={(e) => handleUpload(e)}>Upload</button>

              <p>
                File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                OGG, GLB, GLTF. Max size: 100 MB
              </p>
            </div>

            <div className="inputContainer">
              <label>External Link</label>
              {/* aca deberia ir el input para agregar el archivo  */}
              <input
                type={"text"}
                name={"link"}
                value={input.link}
                onChange={(e) => handleChange(e)}
              />

              <p>
                It will include a link to this URL on the detail page of this
                item so that users can click to learn more about it.
              </p>
            </div>

            <div className="inputContainer">
              <label>Description</label>
              <input
                type={"text"}
                name={"description"}
                value={input.description}
                onChange={(e) => handleChange(e)}
              />
              <p>
                The description will be included on the item's detail page below
                its image.
              </p>
            </div>

            <div className="inputContainer">
              <label>Collection</label>
              <p>This is the collection where your item will appear.</p>
              <input
                type={"text"}
                name={"collection"}
                value={input.collection}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="inputContainer">
              <label>Price</label>
              {/* se podria agregar en dolares/ethereum ,etc */}
              <input
                type={"number"}
                name={"price"}
                value={input.price}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="inputContainer">
              <label>Category</label>
              <p>
                Add one category or more to classify it.You can select
                categories by existing ones or add a new one
              </p>
              <input type={"text"} name={"category"} />
              <button className="addCategory"></button>
              <select onChange={(e) => handleChangeSelect(e)} name="categories">
                <option hidden disabled selected value>
                  Categories
                </option>

                {categories &&
                  categories.map((e) => (
                    <option value={e} name="categories" key={e}>
                      {e}
                    </option>
                  ))}
              </select>
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
            />
          </div>
          <div className="validations">
            <h4>{errors.name}</h4>
            <h4>{errors.price}</h4>
          </div>
          <input
            className="submit"
            type="submit"
            value={"Create NFT"}
            disabled={
              errors.name !== "Name is correct" ||
              errors.price !== "Price is correct"
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
}
