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
                      placeholder={"NFT name..."}
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
                    image={createdNft.image || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO0AAADVCAMAAACMuod9AAAAVFBMVEXu7u5mZmbz8/NZWVlcXFy8vLzU1NSXl5eioqKysrL19fV/f3/x8fFjY2NeXl7Nzc3j4+NqamrKysqMjIx3d3eGhobp6ene3t5TU1Nubm6wsLCPj49E04CSAAACxUlEQVR4nO3b63KiQBRFYWwIJoSbYnQyef/3HPCCIt1OMraTOjtr/VSk+vMolypNkh+U++4F/NfQ6oZWN7S6odUNrW5odUOrG1rd0OqGVje0uqHVDa1uaHVDqxta3dDqhlY3tLqh1Q2tbmh1Q6sbWt3Q6oZWN7S6odUNrW5odUOrG1rd0OqGVje0uqHVDa1uaHVDq9sDtKWLVfSlxd9j2TzFqo29tge8f89plsao/pWXsdcWeX+Dtn5dxug9M6FNX4oYvaZGtDH2ivbe0N65R7T/ENp7+25tf5kZIOlpS5e//F4nXpScttxt0rrOVo1vezVt2dbVoq9KGw9LTVu87bE9d+F5gZq2zRbHsvXcJaYtm1Fbe16hps1/kjbZjlqfy7bWtdePFsv6eJTaFPPtTWtdk65nD7/vuVW1EzsD9dgqW1+NsEyWWZalb61PZVjr9sff+XSLbdO0/itlu9p+ssfz6uwLWoZEZrVuPLN6vruhrGrPWO90x6bHKqPaS2zP9d7wDJt11eRoZVM7xQan67r+huiSa1J7jQ1Mt8cO90IXXIvaOXbgzqa7x065BrU+rGe6RXe6hjxz7Wn92BnXnbA9d3XimtOGsFfc4oy9mK41rWvqAHbCdd1ks9N0jWnDk51wi+7qPTlybWlvTfaC6z5mmx24prS3JztyZ5MduZa0Lr892QO38Ez2xDWkdfnfJnvg+rF7rh1t8YnJDtVV6JlqlVjRPn1qsrerNhsb2vojOLKvcBc2fkEU/nx+LSPaOFi0964t8v7QokVrU5tmcbLw++Rkl8dqG3tpj/gXRRmr6CvjPyO6odUNrW5odUOrG1rd0OqGVje0uqHVDa1uaHVDqxta3dDqhlY3tLqh1Q2tbmh1Q6sbWt3Q6oZWN7S6odUNrW5odUOrG1rd0OqGVje0uqHVDa1uaHVDqxta3dDqhlY39wcAlyz4wLPLJwAAAABJRU5ErkJggg=="}
                    name={createdNft.name}
                    price={createdNft.price}
                    tokenId={createdNft.tokenId}
                  />
                </div>
              </div>
            <div className="buttons-next-prev">
                  <button 
                    onClick={back}> 
                    back 
                    </button>
                  <button
                    className={errors.name === "Name is correct" && errors.price === "Price is correct" ? "button-next" : "disabled"}
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

          </div>
    </>
  );
};