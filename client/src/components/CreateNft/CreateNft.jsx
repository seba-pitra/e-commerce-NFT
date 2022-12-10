import React from "react";
import "./CreateNft.css";
import "../NFTCard/NFTCard.css";
import PreviewNft from './PreviewNft/PreviewNft'
// import * as actions from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";

export default function Form() {
  //name and file for the nft are obligatories
  let [input, setInput] = React.useState({
    name: "NFT's name",
    description: "",
    collection: "",
    link: "",
    categories: [],
    price: 0,
    image:"no image found"
  });
  //asi tendria q venir el array de categories,puede cambiar como venga
  let categories = ["humanoid", "cyberpunk", "object", "animal"];

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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
            <label>Name</label>
            <input
              type={"text"}
              name={"name"}
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            <h3>Image,video,audio or 3D model</h3>
            <p>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </p>

            <label>External Link</label>
            {/* aca deberia ir el input para agregar el archivo  */}
            <input
              type={"text"}
              name={"link"}
              value={input.link}
              onChange={(e) => handleChange(e)}
            />

            <p>
              It will include a link to this URL on the detail page of this item
              so that users can click to learn more about it.
            </p>

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

            <label>Collection</label>
            <p>This is the collection where your item will appear.</p>
            <input
              type={"text"}
              name={"collection"}
              value={input.collection}
              onChange={(e) => handleChange(e)}
            />

            <label>Price</label>
            {/* se podria agregar en dolares/ethereum ,etc */}
            <input
              type={"number"}
              name={"price"}
              value={input.price}
              onChange={(e) => handleChange(e)}
            />

            <label>Category</label>
            <p>
              Add one category or more to classify it.You can select categories
              by existing ones or add a new one
            </p>
            <input type={"text"} name={"category"} />
            <button className="addCategory"></button>

            <select onChange={(e) => handleChangeSelect(e)} name="categories">
              <option hidden disabled selected value>
                Temperaments
              </option>

              {categories &&
                categories.map((e) => (
                  <option value={e} name="categories" key={e}>
                    {e}
                  </option>
                ))}
            </select>
          </form>
        </div>

        <div className="ilustrationContainer">
          <h2>This is how your NFT it will be create</h2>
          <PreviewNft image={input.image} name={input.name} price={input.price} />
        </div>
      </div>
    </React.Fragment>
  );
}
