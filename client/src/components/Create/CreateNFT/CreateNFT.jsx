import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as utils from "../../../utils"
import CloudinaryImageInput from "../CloudinaryImageInput/CloudinaryImageInput";
import PreviewNft from "./PreviewNft/PreviewNft"
import * as actions from "../../../redux/actions"

export default function CreateNFT({
    createdNft,
    setCreatedNft,
    errors,
    setErrors,
    back, 
    next
  }) {
  const user = useSelector(state => state.loggedUser)
  const dispatch = useDispatch();


  const handleChange = (e) => {
    e.preventDefault();
    setCreatedNft((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(utils.validate({ ...createdNft, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
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

  return (
    <>
    <div className="flex-row2">
            <div className="first-field-collections">
              <form className="createNft">
                <div className="inputContainer">
                  <h5>Name</h5>
                  <div className="inputAndErrorsMsg">
                    <input
                      type={"text"}
                      name={"name"}
                      value={createdNft.name}
                      onChange={(e) => handleChange(e)}
                      placeholder={"NFTs name..."}
                    />
                    <p
                      className={
                        errors.name === "Name is correct"
                          ? "greenMsg"
                          : "redMsg"
                      }
                    >
                      {errors.name}
                    </p>
                  </div>
                </div>

                <div className="inputContainer">
                  <CloudinaryImageInput
                    setImage={setCreatedNft}
                    />
                </div>

                <div className="inputContainer">
                  <h5>Description</h5>
                  <p>
                    The description will be included on the item's detail page
                    below its image.
                  </p>
                  <input
                    type={"text"}
                    name={"description"}
                    value={createdNft.description}
                    onChange={(e) => handleChange(e)}
                    placeholder={"this NFT its about..."}
                  />
                </div>

                <div className="inputContainer">
                  <h5>Price</h5>
                  <p>Put the price only in Ethereum</p>
                  <div className="inputAndErrorsMsg">
                    <input
                      type={"number"}
                      name={"price"}
                      value={createdNft.price}
                      onChange={(e) => handleChange(e)}
                    />
                    <p
                      className={
                        errors.price === "Price is correct"
                          ? "greenMsg"
                          : "redMsg"
                      }
                    >
                      {errors.price}
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="rigth-side">
              <div className="ilustration-validations">
                <div className="ilustrationContainer">
                  <h2>Nft preview</h2>
                  <PreviewNft
                    image={createdNft.image}
                    name={createdNft.name}
                    price={createdNft.price}
                    tokenId={createdNft.tokenId}
                  />
                </div>
              </div>
            </div>

            <div className="buttons-next-prev">
                  <button 
                    onClick={back}> 
                    back 
                    </button>
                  <button
                    onClick={next}
                    disabled={
                      errors.name !== "Name is correct" ||
                      errors.price !== "Price is correct"
                    }
                  >
                    next
                  </button>
            </div>
          </div>
    </>
  );
};