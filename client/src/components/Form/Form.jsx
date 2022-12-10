import React from "react";
import * as actions from "../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";


export default function Form(){
    let [input,setInput] = React.useState({
        name:'',
        description:'',
        collection:'',
        link:''

    })

    return(
        <React.Fragment>
        <h1>Create Non Fungible Token</h1>
        <form className={s.createNft}>
        <div>
        <h3>Image,video,audio or 3D model</h3>
        <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>


        <label>Name</label>
        <input type={"text"}
              name={"name"}
              value={input.name}
              onChange={(e) => handleChange(e)}  />
        


        <label>External Link</label>
        <input type={"text"}
              name={"name"}
              value={input.link}
              onChange={(e) => handleChange(e)} />

        <p>It will include a link to this URL on the detail page of this item so that users can click to learn more about it.</p>



        <label>Description</label>
        <input type={"text"}
              name={"name"}
              value={input.description}
              onChange={(e) => handleChange(e)} />
        <p>The description will be included on the item's detail page below its image.</p>


        <label>Collection</label>
        <p>This is the collection where your item will appear.</p>
        <input type={"text"}
              name={"name"}
              value={input.collection}
              onChange={(e) => handleChange(e)}  />
        </div>
        </form>

            
        </React.Fragment>
    )



} 